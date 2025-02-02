import {useState,useEffect} from "react";
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
import {getTimeDifference} from "../helpers/getTimeDifference"
import {useSelector} from "react-redux"
export default function ChatListItem({ participants, lastmessage, chatId }) {
  const { online_users } = useSelector((state) => state.ONLINEUSER);

  const { id } = useParams();
  const timeDifference = getTimeDifference(lastmessage?.updatedAt);





  return (
    <>
      <ListItem>
        <ListItemButton
        component={Link}
        to={`/chat/${chatId}`}
          onClick={() => {
            toggleMessagesPane();
            // setSelectedChat({ id, sender, messages });
          }}
          selected={id==chatId}
          color="neutral"
          sx={{ flexDirection: "column", alignItems: "initial", gap: 1 }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus online={online_users.includes(participants._id)} src={participants.avtar} />
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
                {timeDifference||""}
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
            {lastmessage?(lastmessage?.content):("")}
          </Typography>


        </ListItemButton>
      </ListItem>


      <ListDivider sx={{ margin: 0 }} />
    </>
  );
}
