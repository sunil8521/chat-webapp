import  React from 'react';
import Sheet from '@mui/joy/Sheet';
import Skeleton from '@mui/joy/Skeleton';


import MessagesPane from './MessagesPane';
import ChatsPane from './ChatsPane';


import { chats } from '../../data';

import {useMyAllchatQuery} from "../redux/api"
import WelcomeMessage from './WelcomeMessage';

export default function MyProfile() {

  const [selectedChat, setSelectedChat] = React.useState(chats[0]);

  const { data, isError, isLoading, error, refetch } = useMyAllchatQuery("");

  return (


  
  );
}
