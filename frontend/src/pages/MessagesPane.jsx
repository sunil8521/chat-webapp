import { useEffect, useState,useRef } from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
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
  const messagesContainerRef=useRef(null)
  console.log(messagesContainerRef)
  const {
    data: messageData,
    error: messageError,
    isLoading: messageIsLoading,
  } = useChatMessagesQuery(id);

  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    setChatMessages(messageData?.allMessages);
  }, [messageData?.allMessages]);

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

     ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
        };
  }, [ws, id]);

  useEffect(() => {
    const container = messagesContainerRef.current;

    const handleScroll = () => {
      if (container.scrollTop === 0 && hasMore && !isLoadingMore) {
        // fetchOlderMessages();
        console.log("more")
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isLoadingMore]);



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
          flexDirection: "column-reverse",
        }}
      >
        <Stack spacing={2} sx={{ justifyContent: "flex-end" }}>
          {messageIsLoading ? (
            <Loader />
          ) : (
            <>
              {chatMessages?.map((message, index) => {
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
      </Box>

      <MessageInput payload={payload} />
    </Sheet>
  );
};

const MessagesPaneWithLayout = LayoutPage(MessagesPane);
export default MessagesPaneWithLayout;
