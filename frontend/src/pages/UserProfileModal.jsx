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
import moment from "moment"
import { useDispatch, useSelector } from "react-redux";
import { toggleSeeUserProfileModal } from "../redux/reducer/modal";
const UserProfileModal = () => {
  const dispatch = useDispatch();
  const { seeUserProfile ,userProfileData} = useSelector((state) => state.MODAL);
  return (
    <Modal open={seeUserProfile} onClose={() => dispatch(toggleSeeUserProfileModal())}>
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
            src={userProfileData.avtar}
            alt={userProfileData.fullname}
            sx={{ width: 80, height: 80, mb: 2 }}
          />

          {/* Name and Username */}
          <Box>
            <Typography level="h5" sx={{ fontWeight: "bold" }}>
              {userProfileData.fullname}
            </Typography>
            <Typography level="body-sm" sx={{ color: "text.secondary" }}>
              @{userProfileData.username}
            </Typography>
          </Box>

          {/* About Section */}
          <Box>
            <Typography level="body-sm" sx={{ color: "text.primary" }}>
              {userProfileData.bio||""}
            </Typography>
          </Box>

          {/* Divider */}
          <Divider sx={{ width: "100%", my: 1 }} />

          {/* Additional Info (e.g., Join Date) */}
          <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
            Joined on { moment(userProfileData.createdAt).format("DD MMM YYYY")}
          </Typography>

          {/* Action Buttons */}

        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default UserProfileModal;
