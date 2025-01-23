import * as React from 'react';
import { Box, Button, Card, Typography, Stack, Sheet } from '@mui/joy';

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'neutral.100' }}>
      {/* Header */}
      <Sheet
        component="header"
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'neutral.50',
          boxShadow: 'sm',
        }}
      >
        <Typography fontWeight="lg" level="h5">
          Acme Co.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="soft">Home</Button>
          <Button variant="soft">About</Button>
          <Button variant="soft">Features</Button>
        </Stack>
      </Sheet>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            maxWidth: 600,
            textAlign: 'center',
            p: 4,
            bgcolor: 'background.body',
            boxShadow: 'lg',
          }}
        >
          <Typography level="h2" fontWeight="xl" mb={1}>
            Welcome to Acme Co.
          </Typography>
          <Typography level="body-lg" mb={3}>
            Join us to explore seamless communication with your team.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="solid" color="primary" size="lg">
              Login
            </Button>
            <Button variant="outlined" size="lg">
              Sign Up
            </Button>
          </Stack>
        </Card>
      </Box>

      {/* Footer */}
      <Sheet
        component="footer"
        sx={{
          p: 2,
          textAlign: 'center',
          bgcolor: 'neutral.50',
          boxShadow: 'sm',
        }}
      >
        <Typography level="body-sm">© 2025 Acme Co. All rights reserved.</Typography>
      </Sheet>
    </Box>
  );
}
