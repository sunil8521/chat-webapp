import React from "react";
import { Box, Typography, Stack } from "@mui/joy";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MessageLayouts from "../../components/Layouts/MessageLayout";
const WelcomeMessage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: { xs: "calc(100dvh - var(--Header-height))", md: "100dvh" },
        textAlign: "center",
        backgroundColor: "background.level1",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <ChatBubbleOutlineIcon sx={{ fontSize: 64, color: "primary.main" }} />
        <Typography level="h2" component="h1" sx={{ fontWeight: "bold" }}>
          Welcome to ChatApp
        </Typography>
        <Typography level="body1" color="text.secondary">
          Select a conversation from the left panel to view messages here.
        </Typography>
      </Stack>
    </Box>
  );
};

const WelcomeMessageWithLayout = MessageLayouts(WelcomeMessage);
export default WelcomeMessageWithLayout;
