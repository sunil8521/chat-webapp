import {useEffect, useState} from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton, Input } from '@mui/joy';
import List from '@mui/joy/List';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChatListItem from './ChatListItem';
import Skeleton from '@mui/joy/Skeleton';
import { toggleMessagesPane } from '../../utils';
import { useGlobalVar } from "../context/ContextUse";

export default function ChatsPane(props) {
  const { ws } = useGlobalVar();
  const [lastMessage, setLastMessage] = useState({});
  const { chats, isLoading, isError } = props;
  

  useEffect(()=>{
    if(!ws) return
    const handleMessage = (event) => {
    const newMessage = JSON.parse(event.data);
    if (newMessage.type === "last_message") {
      setLastMessage((prevMessages) => ({
        ...prevMessages,
        [newMessage.chatid]: newMessage, 
      }));
    }

  
  };  
  ws.addEventListener('message', handleMessage);

  return () => {
      ws.removeEventListener('message', handleMessage);
  };
},[ws])

  return (
    <Sheet
      sx={{
        borderRight: '1px solid',
        borderColor: 'divider',
        height: { sm: 'calc(100dvh - var(--Header-height))', md: '100dvh' },
        overflowY: 'auto',
      }}
    >

      
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2, pb: 1.5 }}
      >
        <Typography
          component="h1"
          endDecorator={
            <Chip
              variant="soft"
              color="primary"
              size="md"
              slotProps={{ root: { component: 'span' } }}
            >
              4
            </Chip>
          }
          sx={{ fontSize: { xs: 'md', md: 'lg' }, fontWeight: 'lg', mr: 'auto' }}
        >
          Messages
        </Typography>
        <IconButton
          variant="plain"
          aria-label="edit"
          color="neutral"
          size="sm"
          sx={{ display: { xs: 'none', sm: 'unset' } }}
        >
          <EditNoteRoundedIcon />
        </IconButton>
        <IconButton
          variant="plain"
          aria-label="edit"
          color="neutral"
          size="sm"
          onClick={() => {
            toggleMessagesPane();
          }}
          sx={{ display: { sm: 'none' } }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Stack>
      <Box sx={{ px: 2, pb: 1.5 }}>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Search"
          aria-label="Search"
        />
      </Box>
      {isError ? (
          <Typography
            color="danger"
            sx={{
              height:"80dvh",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              fontSize: '1rem',
            }}
          >
            Unable to fetch chats.
          </Typography>
        ):
      
        <Skeleton loading={isLoading}>
      <List
        sx={{
          py: 0,
          '--ListItem-paddingY': '0.75rem',
          '--ListItem-paddingX': '1rem',
        }}
      >

        {chats?.map((chat) => (
          <ChatListItem
          key={chat._id} 
          chatId={chat._id}  // Pass chatId explicitly
          participants={chat.participants} 
          lastmessage={lastMessage[chat._id]||chat.lastmessage} 
        


            />
        ))}
      </List>
      </Skeleton>
      }

    

    </Sheet>
  );
}
