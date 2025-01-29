import React from "react";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import AvatarWithStatus from "./AvatarWithStatus";
import Skeleton from '@mui/joy/Skeleton';
import { Link } from "react-router-dom";
import {toggleMessagesPane} from "../../utils"
import { useParams } from "react-router-dom";
export default function ChatListItem(chat) {
  const {participants}=chat
  const { id } = useParams();





  return (
    <>
      <ListItem>
        <ListItemButton
        component={Link}
        to={`/chat/${chat._id}`}
          onClick={() => {
            toggleMessagesPane();
            // setSelectedChat({ id, sender, messages });
          }}
          selected={id==participants?._id}
          color="neutral"
          sx={{ flexDirection: "column", alignItems: "initial", gap: 1 }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus online={false} src={participants.avtar} />
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{participants.fullname}</Typography>
              <Typography level="body-sm">@{participants.username}</Typography>
            </Box>
            <Box sx={{ lineHeight: 1.5, textAlign: "right" }}>
              {/* {messages[0].unread && (
                <CircleIcon sx={{ fontSize: 12 }} color="primary" />
              )} */}
              <Typography
                level="body-xs"
                noWrap
                sx={{ display: { xs: "none", md: "block" } }}
              >
                5 mins ago
              </Typography>
            </Box>
          </Stack>

          <Typography
            level="body-sm"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {"This message is last message from user"}
          </Typography>


        </ListItemButton>
      </ListItem>


      <ListDivider sx={{ margin: 0 }} />
    </>
  );
}
