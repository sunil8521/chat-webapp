import { useState, useEffect } from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { CheckRounded, CloseRounded } from "@mui/icons-material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import PersonAddRounded from "@mui/icons-material/PersonAddRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Person from "@mui/icons-material/Person";
import axios from "axios";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { deleteUser } from "../redux/reducer/auth";
import { closeSidebar, toggleMessagesPane } from "../../utils";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import { toggleFindFriendsModal,toggleNotofocationModal } from "../redux/reducer/modal";

export default function Sidebar() {
  const { user, loading } = useSelector((state) => state.AUTH);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await axios.get(`${import.meta.env.VITE_SERVERURL}/api/user/logout`, {
      withCredentials: true,
    });
    toast.success("Logout successfully");
    dispatch(deleteUser());
  };
  const { findFriends,notifications } = useSelector((state) => state.MODAL);
  const [searchTerm, setSearchTerm] = useState("");
  // const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(searchTerm);
    }, 1000);

    return () => {
      console.log("return");
      clearTimeout(timer);
    };
  }, [searchTerm]);

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
            <ListItemButton selected component={Link} to="/chat">
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => toggleMessagesPane()}>
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Messages</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => dispatch(toggleFindFriendsModal())}>
              <GroupRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Find users</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => dispatch(toggleNotofocationModal())}>
              <GroupRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Notifications</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>


          <ListItem>
            <ListItemButton role="menuitem" component={Link} to="/profile">
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
              {/* Example users - replace with actual data */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((user) => (
                <ListItem
                  key={user}
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
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Avatar></Avatar>
                    <Typography>User {user}</Typography>
                  </Box>

                  <Button
                    variant="outlined"
                    size="sm"
                    startDecorator={<PersonAddRounded />}
                    sx={{ ml: 1 }}
                  >
                    Add Friend
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        </Sheet>
      </Modal>

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
              {[1, 2, 3, 4, 5, 6, 7, 8].map((request) => (
                <ListItem
                  key={request}
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
                    <Avatar size="sm" src="/static/images/avatar/1.jpg" />
                    <Typography sx={{ fontWeight: "md" }}>
                      John Doe {request}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton variant="solid" color="success" size="sm">
                      <CheckRounded />
                    </IconButton>
                    <IconButton variant="outlined" color="neutral" size="sm">
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
