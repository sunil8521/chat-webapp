import { CheckRounded, CloseRounded, Refresh } from "@mui/icons-material";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Person from "@mui/icons-material/Person";
import PersonAddRounded from "@mui/icons-material/PersonAddRounded";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import GlobalStyles from "@mui/joy/GlobalStyles";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeSidebar, toggleMessagesPane } from "../../utils";
import { deleteUser } from "../redux/reducer/auth";
import {
  toggleFindFriendsModal,
  toggleNotofocationModal,
} from "../redux/reducer/modal";
import { routes } from "../routes/routes";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { useLocation } from "react-router-dom";
import { useLazySearchUserQuery } from "../redux/api";
import MiniLoader from "../shared/MiniLoader";
import {
  useSendFrindRequestMutation,
  useGetFrindRequestQuery,
  useHandleFrindRequestMutation,
} from "../redux/api";
import { useGlobalVar } from "../context/ContextUse";
import { handleNotificationsCount } from "../redux/reducer/notification";
import { Alert } from "@mui/joy";
export default function Sidebar() {
  const { ws } = useGlobalVar();
  const location = useLocation();
  const { user } = useSelector((state) => state.AUTH);
  const [reSearch, { data, isError, isFetching }] = useLazySearchUserQuery();
  const [friendRequest, setFriendRequest] = useState([]);
  const {
    refetch,
    data: friendRequestData,
    isFetching: friendRequestLoading,
    isError: friendRequestError,
  } = useGetFrindRequestQuery();
  useEffect(() => {
    setFriendRequest(friendRequestData?.requests);
  }, [friendRequestData]);

  const [handleFriendRequest, { isLoading, error }] =
    useHandleFrindRequestMutation();

  const dispatch = useDispatch();
  const handleLogout = async () => {
    await axios.get(`${import.meta.env.VITE_SERVERURL}/api/user/logout`, {
      withCredentials: true,
    });
    toast.success("Logout successfully");
    dispatch(deleteUser());
  };
  const { findFriends, notifications } = useSelector((state) => state.MODAL);

  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      reSearch(searchTerm);
      2;
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, reSearch]);
  const [sendFrindRequest] = useSendFrindRequestMutation();

  const sendRequest = async (id) => {
    const toastId = toast.loading("Sending...");
    const res = await sendFrindRequest({ touserid: id });
    if (res.error) {
      toast.error(res.error.data?.message || "Something went wrong", {
        id: toastId,
      }); // Display error
    } else {
      toast.success("Friend request sent!", { id: toastId });
    }
  };
  useEffect(() => {
    if (!ws) return;
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "notification") {
        console.log("refectch")
        refetch();
        // setFriendRequest((prev) => [...prev, data.payload]);
        // dispatch(handleNotificationsCount(1));
      }
      if (data.type === "notification_status") {
        console.log("notification recive");
      }
    };
    ws.addEventListener("message", handleMessage);
    return () => {
      ws.removeEventListener("message", handleMessage);
    };
  }, [ws,refetch]);

  const handleRequest = async (data) => {
    try {
      const res = await handleFriendRequest(data).unwrap();
    } catch (err) {
      // console.error("Error handling request:", err);
    }
  };

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level="title-lg">hul chat</Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>

      <Box
        onClick={() => closeSidebar()}
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton
              selected={location.pathname.includes("home")}
              component={Link}
              to="/home"
            >
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ display: { xs: "unset", sm: "none" } }}>
            <ListItemButton onClick={() => toggleMessagesPane()}>
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Messages</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              selected={location.pathname.includes("profile")}
              role="menuitem"
              component={Link}
              to="/profile"
            >
              <Person />
              <ListItemContent>
                <Typography level="title-sm">My profile</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>

        {/* to user profile */}
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Avatar variant="outlined" size="sm" src={user.avtar} />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm">{user.fullname}</Typography>
            <Typography level="body-xs">{user.email}</Typography>
          </Box>
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={handleLogout}
          >
            <LogoutRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      {/* search user modal */}
      <Modal
        open={findFriends}
        onClose={() => dispatch(toggleFindFriendsModal())}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 400,
            borderRadius: "md",
            p: 2,
            boxShadow: "lg",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            level="h4"
            sx={{ fontWeight: "lg", mb: 1 }}
          >
            Search Users
          </Typography>

          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            placeholder="Search users..."
            startDecorator={<SearchRounded />}
            sx={{
              width: "100%",
              borderRadius: "sm",
            }}
          />

          <Box
            sx={{
              maxHeight: 250,
              overflowY: "auto",
              borderRadius: "sm",
              border: "1px solid",
              borderColor: "neutral.outlinedBorder",
              p: 1,
            }}
          >
            <List>
              {isFetching ? (
                <MiniLoader />
              ) : isError ? (
                <Typography>error</Typography>
              ) : (
                <>
                  {data?.users?.map((user) => (
                    <ListItem
                      key={user._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                        borderRadius: "sm",
                        "&:hover": {
                          backgroundColor: "background.level1",
                        },
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar src={user.avtar} alt={user.fullname} />
                        <Typography>{user.fullname}</Typography>
                      </Box>

                      <Button
                        onClick={() => {
                          sendRequest(user._id);
                        }}
                        disabled={user.isMyFriend}
                        variant="outlined"
                        size="sm"
                        startDecorator={
                          user.isMyFriend ? (
                            <HowToRegIcon />
                          ) : (
                            <PersonAddRounded />
                          )
                        }
                        sx={{ ml: 1 }}
                      >
                        {user.isMyFriend ? "In Friend" : "Add Friend"}
                      </Button>
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </Box>
        </Sheet>
      </Modal>

      {/* to see friend request modal */}
      <Modal
        open={notifications}
        onClose={() => dispatch(toggleNotofocationModal())}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 400,
            borderRadius: "md",
            p: 2,
            boxShadow: "lg",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            level="h4"
            sx={{ fontWeight: "lg", mb: 1 }}
          >
            Friend Requests
          </Typography>

          <Box
            sx={{
              maxHeight: 300,
              overflowY: "auto",
              borderRadius: "sm",
              border: "1px solid",
              borderColor: "neutral.outlinedBorder",
              p: 1,
            }}
          >
            <List>
              {friendRequest?.map((request) => (
                <ListItem
                  key={request._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1.5,
                    px: 1,
                    borderRadius: "sm",
                    "&:hover": {
                      backgroundColor: "background.level1",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar size="sm" src={request?.fromuserid?.avtar} />
                    <Typography sx={{ fontWeight: "md" }}>
                      {request?.fromuserid?.fullname}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      variant="solid"
                      color="success"
                      size="sm"
                      onClick={() => {
                        handleRequest({
                          status: "accept",
                          requestid: request._id,
                        });
                      }}
                    >
                      <CheckRounded />
                    </IconButton>
                    <IconButton
                      variant="outlined"
                      color="neutral"
                      size="sm"
                      onClick={() => {
                        handleRequest({
                          status: "reject",
                          requestid: request._id,
                        });
                      }}
                    >
                      <CloseRounded />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </Sheet>
      </Modal>
    </Sheet>
  );
}
