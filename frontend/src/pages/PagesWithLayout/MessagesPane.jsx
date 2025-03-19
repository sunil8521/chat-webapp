import { useEffect, useState, useRef, useCallback } from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import CircularProgress from "@mui/joy/CircularProgress";
import Stack from "@mui/joy/Stack";
import { useParams } from "react-router-dom";
import MiniLoader from "../../shared/MiniLoader";
import ChatBubble from "../../components/ChatBubble";
import MessageInput from "../../components/MessageInput";
import MessagesPaneHeader from "../../components/MessagesPaneHeader";
import { useSelector } from "react-redux";
import { useChatMembersQuery, useChatMessagesQuery } from "../../redux/api";
import { useGlobalVar } from "../../context/ContextUse";
import MessageLayouts from "../../components/Layouts/MessageLayout";


const MessagesPane = () => {
  const { ws,peer } = useGlobalVar();
  const { user } = useSelector((s) => s.AUTH);
  const { id } = useParams();

  // Fetch chat members
  const { data, error, isLoading } = useChatMembersQuery(id);
  const members = data?.members?.participants.map(({ _id }) => _id);
  const sender = data?.members?.participants.find(
    ({ _id }) => _id.toString() !== user._id.toString()
  );
  const payload = {
    chatid: id,
    members,
    senderid: { ...user },
  };

  // Pagination state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch chat messages
  const {
    data: messageData,
    error: messageError,
    isLoading: messageIsLoading,
    isFetching: messageIsFetching,
  } = useChatMessagesQuery({ id, page });

  // Messages state
  const [databaseChatMessages, setDatabaseChatMessages] = useState([]);
  const [realTimeMessages, setRealTimeMessages] = useState([]);

  // Refs for scrolling
  const messagesContainerRef = useRef(null);
  const endOfMessagesRef = useRef(null);
  const debounceTimer = useRef(null);

  // Combine messages
  const allMessages = [...databaseChatMessages, ...realTimeMessages];

  // Reset state when chat ID changes
  useEffect(() => {
    setDatabaseChatMessages([]);
    setRealTimeMessages([]);
    setPage(1);
    setHasMore(true);
  }, [id]);

  // Update database messages when new data is fetched
  useEffect(() => {
    let prevScrollHeight = 0;
    let prevScrollTop = 0;

    if (messagesContainerRef.current) {
      prevScrollHeight = messagesContainerRef.current.scrollHeight;
      prevScrollTop = messagesContainerRef.current.scrollTop;
    }

    if (!messageData?.allMessages) return;
    if (page === 1) {
      setDatabaseChatMessages(messageData.allMessages);
    } else {
      setDatabaseChatMessages((prev) => {
        const seen = new Set(prev.map((i) => i._id));
        const newMessages = messageData.allMessages.filter(
          (i) => !seen.has(i._id)
        );
        return [...newMessages, ...prev];
      });
    }
    if (page >= messageData?.pagination?.totalPages) {
      setHasMore(false);
    }
    setIsLoadingMore(false);

    requestAnimationFrame(() => {
      if (messagesContainerRef.current) {
        const newScrollTop =
          prevScrollTop +
          messagesContainerRef.current.scrollHeight -
          prevScrollHeight;
        messagesContainerRef.current.scrollTop = newScrollTop;
      }
    });
  }, [messageData, page]);

  // Handle WebSocket messages
  useEffect(() => {
    if (!ws) return;

    const handleMessage = async(event) => {
      const newMessage = JSON.parse(event.data);
      if (
        newMessage.type === "new_message" &&
        id.toString() === newMessage.payload.chatid
      ) {
        setRealTimeMessages((prev) => [...prev, newMessage.payload]);
      }
    };

    ws.addEventListener("message", handleMessage);
    return () => {
      ws.removeEventListener("message", handleMessage);
    };
  }, [ws, id]);

  // Handle scroll for pagination
  const handleScroll = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (!messagesContainerRef.current || !hasMore || isLoadingMore) return;

      const { scrollTop } = messagesContainerRef.current;

      if (scrollTop <= 100 * page) {
        setPage((prev) => {
          console.log("enter and chnge page ");
          const nextPage = prev + 1;
          //TODO: page change automatically
          if (nextPage > messageData?.messageData?.totalPages) {
            setHasMore(false);
            return prev;
          }
          setIsLoadingMore(true);
          return nextPage;
        });
      }
    }, 200);
  }, [hasMore, isLoadingMore, messageData?.messageData?.totalPages, page]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) container.addEventListener("scroll", handleScroll);

    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Scroll to bottom for new messages
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [realTimeMessages]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);
  return (
    <Sheet
      sx={{
        height: { xs: "calc(100dvh - var(--Header-height))", md: "100dvh" },
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
      <MessagesPaneHeader sender={sender} />

      <Box
        ref={messagesContainerRef}
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: "scroll",
          flexDirection: "column",
        }}
      >
        <Stack spacing={2} sx={{ justifyContent: "flex-end" }}>
          {messageIsFetching && <MiniLoader />}
          {allMessages?.map((message, index) => {
            const isYou =
              message.senderid._id.toString() === user._id.toString();
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                sx={{ flexDirection: isYou ? "row-reverse" : "row" }}
              >
                <ChatBubble
                  variant={isYou ? "sent" : "received"}
                  {...message}
                />
              </Stack>
            );
          })}
          <div ref={endOfMessagesRef} />
        </Stack>
      </Box>
      <MessageInput payload={payload} />
    </Sheet>
  );
};

const MessagesPaneWithLayout = MessageLayouts(MessagesPane);
export default MessagesPaneWithLayout;
