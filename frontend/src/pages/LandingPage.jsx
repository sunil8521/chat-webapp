import React from "react";
import { Box, Button, Typography,Link } from "@mui/joy";
import {Link as RouterLink} from "react-router-dom"
const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #1a1a2e, #16213e)",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Background SVG */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid slice"
          style={{
            width: "100%",
            height: "100%",
            opacity: 0.2,
          }}
        >
          <path
            d="M0 100 Q400 200 800 100 T1600 100"
            fill="none"
            stroke="#fff"
            strokeWidth="200"
          />
        </svg>
      </Box>

      {/* Content */}
      <Box
        sx={{
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <Typography
          level="h1"
          sx={{
            fontSize: { xs: "2.5rem", md: "4rem" },
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Welcome to Minimal Space
        </Typography>
        <Typography level="h6" sx={{ fontSize: "1.25rem", mb: 3 }}>
          A clean and minimal place for your creativity.
        </Typography>
        <Link
        component={RouterLink}
        to={"/signin"}
          variant="solid"
          sx={{
            p:1,
            backgroundColor: "#4ecca3",
            ":hover": { backgroundColor: "#3db589" },
          }}
        >
          Get Started
        </Link>
      </Box>
    </Box>
  );
};

export default LandingPage;
