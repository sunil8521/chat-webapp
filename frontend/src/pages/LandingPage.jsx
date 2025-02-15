import { Box, Button, Grid, Typography } from "@mui/joy";
import React from 'react';
import { Link as RouterLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <Grid 
    container 
    sx={{ 
      minHeight: "100dvh", 
      alignItems: "center", 
      px: { xs: 2, sm: 4, md: 6 }, 
      textAlign: { xs: "center", md: "left" }
    }}
  >
    {/* Hero Section */}
    <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
      <Box sx={{ maxWidth: { xs: "100%", sm: 600 }, mx: "auto", px: { xs: 2, sm: 4 } }}>
        <Typography 
          level="h1" 
          sx={{ 
            fontSize: { xs: "2rem", sm: "2.5rem", md: "4rem" },
            fontWeight: 800,
            mb: 3,
            lineHeight: 1.2,
            color: "text.primary",
          }}
        >
          Connect Better with
          <Box component="span" sx={{ color: "primary.500", ml: 1.5 }}>
            NextChat
          </Box>
        </Typography>
        
        <Typography 
          level="h4" 
          sx={{ 
            color: "text.secondary", 
            mb: 4,
            fontWeight: 400,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            px: { xs: 1, sm: 0 }
          }}
        >
          Experience seamless communication with crystal-clear voice, video, and instant messaging.
        </Typography>
        
        <Button
          component={RouterLink}
          to="/signin"
          size="lg"
          sx={{
            px: { xs: 4, sm: 6 },
            py: 1.5,
            fontSize: "1.1rem",
            background: "linear-gradient(45deg, #4A90E2 0%, #6C5CE7 100%)",
            "&:hover": {
              background: "linear-gradient(45deg, #6C5CE7 0%, #4A90E2 100%)",
            },
          }}
        >
          {" Get Started"}
        </Button>
      </Box>
    </Grid>
  
    {/* Image Section */}
    <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 }, textAlign: "center" }}>
      <Box 
        sx={{ 
          maxWidth: { xs: "100%", sm: 600, md: 800 },
          mx: "auto",
          filter: "drop-shadow(0px 20px 40px rgba(106, 100, 240, 0.15))",
          px: { xs: 2, sm: 4 }
        }}
      >
        <img 
          src="./svg_one.svg" 
          alt="Chat Illustration" 
          style={{ width: "100%", maxWidth: "90%", height: "auto" }} 
        />
      </Box>
    </Grid>
  </Grid>
  
  );
};

export default LandingPage;