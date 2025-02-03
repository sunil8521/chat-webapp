import { useEffect, useState, useRef } from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import CircularProgress from "@mui/joy/CircularProgress";
import Stack from "@mui/joy/Stack";
import { useParams } from "react-router-dom";

import LayoutPage from "./LayoutPage";
import AvatarWithStatus from "../components/AvatarWithStatus";
import ChatBubble from "../components/ChatBubble";
import MessageInput from "../components/MessageInput";
import MessagesPaneHeader from "../components/MessagesPaneHeader";
import { chats } from "../../data";
import { useSelector } from "react-redux";
import { useChatMembersQuery, useChatMessagesQuery } from "../redux/api";
import Loader from "../shared/Loader";
import { useGlobalVar } from "../context/ContextUse";

const MessagesPane = () => {
  const { ws } = useGlobalVar();
  const { user } = useSelector((s) => s.AUTH);
  const { id } = useParams();
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
  //-----------------------------
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  //----------------------
  const messagesContainerRef = useRef(null);
  const endOfMessagesRef = useRef(null);

  const {
    data: messageData,
    error: messageError,
    isLoading: messageIsLoading,
    refetch,
  } = useChatMessagesQuery({ id, page }); //to fetch message

  const [chatMessages, setChatMessages] = useState([]);
  const [databaseChatMessages, setDatabaseChatMessages] = useState([]);

  useEffect(() => {
    // setChatMessages(messageData?.allMessages);
    setDatabaseChatMessages(messageData?.allMessages);
  }, [messageData?.allMessages]);
console.log(databaseChatMessages)
  useEffect(() => {
    if (!ws) return;
    const handleMessage = (event) => {
      const newMessage = JSON.parse(event.data);
      if (
        newMessage.type === "new_message" &&
        id.toString() == newMessage.payload.chatid
      ) {
        setChatMessages((prev) => [...prev, newMessage.payload]);
      }
    };

    ws.addEventListener("message", handleMessage);

    return () => {
      ws.removeEventListener("message", handleMessage);
    };
  }, [ws, id]);

  useEffect(() => {
    const container = messagesContainerRef.current;

    const handleScroll = () => {
      if (container.scrollTop === 0 && hasMore && !isLoadingMore) {
        console.log("more")
        setIsLoadingMore(true);
        // setPage((prev) => prev + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isLoadingMore]);


  
  useEffect(() => {
    console.log("hello")
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // const allMessages=[...databaseChatMessages,...chatMessages]

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
          {isLoadingMore && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress variant="soft" />
            </Box>
          )}
          {messageIsLoading ? (
            <CircularProgress variant="soft" />
          ) : (
            <>
              {databaseChatMessages?.map((message, index) => {
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
            </>
          )}
        </Stack>
        <div ref={endOfMessagesRef} />
      </Box>

      <MessageInput payload={payload} />
    </Sheet>
  );
};

const MessagesPaneWithLayout = LayoutPage(MessagesPane);
export default MessagesPaneWithLayout;
