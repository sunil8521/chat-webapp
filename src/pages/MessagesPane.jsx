import * as React from "react";
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
import { useChatMembersQuery } from "../redux/api";

const MessagesPane = () => {
  const{user}=useSelector((s)=>s.AUTH)
  // console.log(user)
  const chat = chats[0];
  const { id } = useParams();
  const [chatMessages, setChatMessages] = React.useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = React.useState("");
  const { data, error, isLoading } = useChatMembersQuery(id);

const members=data?.members?.participants.map(({_id})=>_id)



  const sender=data?.members?.participants.find(({_id})=>_id.toString()!==user._id.toString())

  const payload={
    chatid:id,
    members,
    sender:user._id
  }
  

  React.useEffect(() => {
    setChatMessages(chat.messages);
  }, [chat.messages]);

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

          {chatMessages.map((message, index) => {
            const isYou = message.sender === "You";
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                sx={{ flexDirection: isYou ? "row-reverse" : "row" }}
              >
                {message.sender !== "You" && (
                  <AvatarWithStatus
                    online={message.sender.online}
                    src={message.sender.avatar}
                  />
                )}
                <ChatBubble
                  variant={isYou ? "sent" : "received"}
                  {...message}
                />
              </Stack>
            );
          })}

          
        </Stack>
      </Box>

      <MessageInput
       payload={payload}
       
      />
    </Sheet>
  );
};

const MessagesPaneWithLayout = LayoutPage(MessagesPane);
export default MessagesPaneWithLayout;
