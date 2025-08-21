import React from "react";
import Badge from "@mui/joy/Badge";
import NotificationsRounded from "@mui/icons-material/NotificationsRounded";
import Tooltip from "@mui/joy/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFindFriendsModal,
  toggleNotofocationModal,
} from "../redux/reducer/modal";
import { resetNotificationsCount } from "../redux/reducer/notification";

const SearchUserAndNotification = ({ display }) => {
  const dispatch = useDispatch();
  const { notificationsCount } = useSelector((state) => state.OTHER);
  return (
    <Box sx={{ display, alignItems: "center" }}>
      <Tooltip title="Search user" variant="soft">
        <IconButton
          onClick={() => dispatch(toggleFindFriendsModal())}
          variant="plain"
          color="neutral"
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>

      <Badge
        badgeContent={notificationsCount}
        color="primary"
        variant="soft"
        // sx={{ display: { xs: "unset", sm: "none" } }}
      >
        <Tooltip title="Notifications" variant="soft">
          <IconButton
            onClick={() => (
              dispatch(toggleNotofocationModal()),
              dispatch(resetNotificationsCount(-1))
            )}
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
  );
};

export default SearchUserAndNotification;
