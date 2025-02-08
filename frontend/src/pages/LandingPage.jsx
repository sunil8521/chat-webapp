import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { CssVarsProvider } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import React from 'react';
import { Link as RouterLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <CssVarsProvider>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 4,
          padding: 4,
        }}
      >
        {/* Heading */}
        <Typography level="h1" sx={{ fontSize: '3rem', fontWeight: 'bold', color: 'primary.500' }}>
          Welcome to ChatApp
        </Typography>

        {/* Subheading */}
        <Typography level="h4" sx={{ color: 'text.secondary' }}>
          Connect with friends, family, and colleagues seamlessly.
        </Typography>

        {/* Get Started Button */}
        <Link
        component={RouterLink}
        to={"/signin"}
          variant="solid"
          sx={{
            p:1,
            // textDecoration:"None",
            backgroundColor: 'primary.500',
            color: 'white',
            '&:hover': { backgroundColor: 'primary.600' },
          }}
        >
          Get Started
        </Link>

        {/* Features List */}
        <Box
          sx={{
            maxWidth: '600px',
            width: '100%',
            marginTop: 4,
          }}
        >
          <Typography level="h5" sx={{ marginBottom: 2, color: 'text.primary' }}>
            Why Choose ChatApp?
          </Typography>
          <List
            sx={{
              gap: 2,
              '--ListItemDecorator-size': '32px',
            }}
          >
            <ListItem>
              <ListItemDecorator>
                <CheckCircleRoundedIcon sx={{ color: 'success.500' }} />
              </ListItemDecorator>
              <Typography>Real-time messaging with end-to-end encryption.</Typography>
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <CheckCircleRoundedIcon sx={{ color: 'success.500' }} />
              </ListItemDecorator>
              <Typography>Group chats for seamless collaboration.</Typography>
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <CheckCircleRoundedIcon sx={{ color: 'success.500' }} />
              </ListItemDecorator>
              <Typography>Customizable themes for a personalized experience.</Typography>
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <CheckCircleRoundedIcon sx={{ color: 'success.500' }} />
              </ListItemDecorator>
              <Typography>File sharing and media support.</Typography>
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <CheckCircleRoundedIcon sx={{ color: 'success.500' }} />
              </ListItemDecorator>
              <Typography>Cross-platform compatibility (Web, Mobile, Desktop).</Typography>
            </ListItem>
          </List>
        </Box>
      </Container>
    </CssVarsProvider>
  );
};

export default LandingPage;