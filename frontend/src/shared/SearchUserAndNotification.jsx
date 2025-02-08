import React from 'react'
import Badge from "@mui/joy/Badge";
import NotificationsRounded from "@mui/icons-material/NotificationsRounded";
import Tooltip from "@mui/joy/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import {Box,IconButton} from "@mui/joy";
import { useDispatch } from 'react-redux';
import {toggleFindFriendsModal,toggleNotofocationModal} from "../redux/reducer/modal"
const SearchUserAndNotification = ({display}) => {
    const dispatch=useDispatch()

  return (
    <Box sx={{display, alignItems:"center"}}>

    <Tooltip title="Search user" variant="soft">
    <IconButton onClick={() => dispatch(toggleFindFriendsModal())} variant="plain" color="neutral">
      <SearchIcon />
    </IconButton>
    </Tooltip>
  
    <Badge
      badgeContent={3}
      color="primary"
      variant="soft"
      // sx={{ display: { xs: "unset", sm: "none" } }}
    >
      <Tooltip title="Notifications" variant="soft">
        <IconButton
        onClick={() => dispatch(toggleNotofocationModal())}
          variant="plain"
          aria-label="edit"
          color="neutral"
          size="sm"
          // sx={{ display: { xs: "unset", sm: "none" } }}
        >
          <NotificationsRounded />
        </IconButton>
      </Tooltip>
    </Badge>
    
    </Box>
  )
}

export default SearchUserAndNotification
