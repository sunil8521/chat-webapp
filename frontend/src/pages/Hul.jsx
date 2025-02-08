import React from "react";
import {
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
  Avatar,
  Stack,
  Box,
  Divider,
  Button,
} from "@mui/joy";

const UserProfileModal = ( ) => {
    const user = {
        profilePic: 'https://via.placeholder.com/150', // Placeholder image URL
        name: 'Shivam Kumar',
        username: 'letshivamcode',
        about: 'AIML and Cybersec Enthusiast | Full stack developer | Programmer',
        joinDate: '23 Jul 2019',
      };
  return (
    <Modal open={false} 
    // onClose={onClose}
    >
      <ModalDialog
        sx={{
          maxWidth: "400px",
          width: "100%",
          p: 3,
          borderRadius: "md",
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Stack spacing={2} alignItems="flex-start">
          {/* Profile Picture */}
          <Avatar
            src={user.profilePic}
            alt={user.name}
            sx={{ width: 80, height: 80, mb: 2 }}
          />

          {/* Name and Username */}
          <Box>
            <Typography level="h5" sx={{ fontWeight: "bold" }}>
              {user.name}
            </Typography>
            <Typography level="body-sm" sx={{ color: "text.secondary" }}>
              @{user.username}
            </Typography>
          </Box>

          {/* About Section */}
          <Box>
            <Typography level="body-sm" sx={{ color: "text.primary" }}>
              {user.about}
            </Typography>
          </Box>

          {/* Divider */}
          <Divider sx={{ width: "100%", my: 1 }} />

          {/* Additional Info (e.g., Join Date) */}
          <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
            Joined on {user.joinDate}
          </Typography>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} sx={{ width: "100%", mt: 2 }}>
            <Button
              variant="outlined"
              color="neutral"
              fullWidth
            //   onClick={onClose}
            >
              Close
            </Button>
            <Button variant="solid" color="primary" fullWidth>
              Message
            </Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default UserProfileModal;
