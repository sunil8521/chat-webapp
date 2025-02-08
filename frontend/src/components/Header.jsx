import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import IconButton from "@mui/joy/IconButton";
import Sheet from "@mui/joy/Sheet";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { toggleSidebar, toggleMessagesPane } from "../../utils";
import Badge from "@mui/joy/Badge";
import NotificationsRounded from "@mui/icons-material/NotificationsRounded";
import Tooltip from "@mui/joy/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import SearchUserAndNotification from "../shared/SearchUserAndNotification";
export default function Header() {
  return (
    <Sheet
      sx={{
        display: { xs: "flex", md: "none" },
        // display:"flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        width: "100dvw",
        height: "var(--Header-height)",
        zIndex: 9995,
        p: 2,
        gap: 1,
        borderBottom: "1px solid",
        borderColor: "background.level1",
        boxShadow: "sm",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Header-height": "52px",
            [theme.breakpoints.up("lg")]: {
              "--Header-height": "0px",
            },
          },
        })}
      />
      <IconButton
        onClick={() => toggleSidebar()}
        variant="outlined"
        color="neutral"
        size="sm"
      >
        <MenuRoundedIcon />
      </IconButton>


<SearchUserAndNotification display={{xs:"flex",sm:"none"}}/>


    </Sheet>
  );
}
