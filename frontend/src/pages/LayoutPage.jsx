import { useState } from "react";
import Box from "@mui/joy/Box";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
// import MyMessages from '../components/MyMessages';

import { Sheet, Skeleton } from "@mui/joy";
// import Skeleton from '@mui/joy/Skeleton';

import { useMyAllchatQuery } from "../redux/api";
import ChatsPane from "../components/ChatsPane";

import { chats } from "../../data";

function LayoutPage(WrappedComponent) {
  const WithLayout = (props) => {
    const { data, isError, isLoading, error, refetch } = useMyAllchatQuery("");

    return (
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Header />

        <Box component="main" className="MainContent" sx={{ flex: 1 }}>
          {/* this will show all the chats and messages */}
          <Sheet
            sx={{
              flex: 1,
              width: "100%",
              mx: "auto",
              pt: { xs: "var(--Header-height)", md: 0 },
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "minmax(min-content, min(30%, 400px)) 1fr",
              },
            }}
          >
            <Sheet
              sx={{
                position: { xs: "fixed", sm: "sticky" },
                transform: {
                  xs: "translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))",
                  sm: "none",
                },
                transition: "transform 0.4s, width 0.4s",
                zIndex: 100,
                width: "100%",
                top: 52,
              }}
            >
              <ChatsPane
                chats={data?.matchedChats}
                isLoading={isLoading}
                isError={isError}
              
              />
            </Sheet>
            {/* <MessagesPane chat={selectedChat} /> */}

            {/* <WelcomeMessage /> */}
            <WrappedComponent {...props} />
          </Sheet>
        </Box>
      </Box>
    );
  };

  WithLayout.displayName = `HomePage(${getDisplayName(WrappedComponent)})`;
  return WithLayout;
}
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default LayoutPage;
