import {
  ConstructionOutlined,
  EditRounded,
  EmailRounded,
  QrCodeScannerOutlined,
} from "@mui/icons-material";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import LayoutPage from "../../components/Layouts/LayoutPage";
import toast from "react-hot-toast";
function MyProfile() {
  const { user } = useSelector((state) => state.AUTH);
  const [selectedImage, setSelectedImage] = useState(user?.avtar || null);
  const [forBackend, setForbackend] = useState(null);
  // Forms
  const profileForm = useForm({
    defaultValues: {
      username: user.username,
      fullname: user.fullname,
      email: user.email,
    },
  });

  const bioForm = useForm({
    defaultValues: {
      bio: user.bio || "",
    },
  });

  const passwordForm = useForm();

  // Handle Image Selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setForbackend(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Handle Form Submissions
  const onSubmitProfile = async (data) => {
    const updatedFields = new FormData();
    // console.log(data);

    if (
      user.username === data.username &&
      user.fullname === data.fullname &&
      user.email === data.email &&
      !forBackend
    ) {
      return;
    }
    updatedFields.append("username", data.username);
    updatedFields.append("fullname", data.fullname);
    updatedFields.append("email", data.email);
    if (forBackend) updatedFields.append("avtar", forBackend);

    try {
      const res = await axios.patch("/api/user/updateProfile", updatedFields, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      setForbackend(null);
    } catch (error) {
      toast.error(error.response?.data.message || "Unable to update profile");
      // console.error("Update failed:", error.response?.data || error.message);
    }
  };

  const onSubmitBio = async (data) => {
    if (data.bio === user.bio) {
      return;
    }
    try {
      const res = await axios.patch("/api/user/updateBio", data, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data.message || "Unable to update Bio");

      // console.log(er)
    }
    console.log("Bio Updated:", data);
  };

  const onSubmitPassword = async (data) => {
    try {
      const res =await axios.patch("/api/user/updatePassword", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
    } catch (er) {
      console.log(er);
      toast.error(er.response?.data.message || "Unable to update Bio");
    }
  };

  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        pt: { xs: "calc(12px + var(--Header-height))", md: 3 },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        height: "100dvh",
        gap: 1,
        overflow: "auto",
      }}
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <Stack
          spacing={4}
          sx={{
            display: "flex",
            maxWidth: "800px",
            mx: "auto",
            px: { xs: 2, md: 6 },
            py: { xs: 2, md: 3 },
          }}
        >
          {/* Personal Info Card */}
          <Card>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Personal info</Typography>
              <Typography level="body-sm">
                Customize how your profile information will appear to the
                networks.
              </Typography>
            </Box>
            <Divider />

            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { md: "flex" }, my: 1 }}
            >
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={200}
                  sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
                >
                  <img src={selectedImage} alt="Profile" />
                </AspectRatio>
                <input
                  type="file"
                  id="imageUpload"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  onClick={() => document.getElementById("imageUpload").click()}
                  sx={{
                    bgcolor: "background.body",
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "50%",
                    left: 100,
                    top: 170,
                    boxShadow: "sm",
                  }}
                >
                  <EditRounded />
                </IconButton>
              </Stack>

              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                {/* Full Name Field */}
                <Controller
                  name="username"
                  control={profileForm.control}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>Username</FormLabel>
                      <Input size="sm" {...field} />
                    </FormControl>
                  )}
                />
                <Controller
                  name="fullname"
                  control={profileForm.control}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>Full Name</FormLabel>
                      <Input size="sm" {...field} />
                    </FormControl>
                  )}
                />

                {/* Email Field */}
                <Controller
                  name="email"
                  control={profileForm.control}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        size="sm"
                        type="email"
                        startDecorator={<EmailRounded />}
                        {...field}
                      />
                    </FormControl>
                  )}
                />
              </Stack>
            </Stack>

            <CardOverflow
              sx={{ borderTop: "1px solid", borderColor: "divider" }}
            >
              <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                <Button
                  disabled={profileForm.formState.isSubmitting}
                  size="sm"
                  variant="solid"
                  onClick={profileForm.handleSubmit(onSubmitProfile)}
                >
                  Save
                </Button>
              </CardActions>
            </CardOverflow>
          </Card>

          {/* Bio Card */}
          <Card>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Bio</Typography>
              <Typography level="body-sm">
                Write a short introduction to be displayed on your profile.
              </Typography>
            </Box>
            <Divider />
            <Stack spacing={2} sx={{ my: 1 }}>
              <Controller
                name="bio"
                control={bioForm.control}
                render={({ field }) => (
                  <Textarea size="sm" minRows={4} sx={{ mt: 1.5 }} {...field} />
                )}
              />
              <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
                275 characters left
              </FormHelperText>
            </Stack>
            <CardOverflow
              sx={{ borderTop: "1px solid", borderColor: "divider" }}
            >
              <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                <Button
                  disabled={bioForm.formState.isSubmitting}
                  size="sm"
                  variant="solid"
                  onClick={bioForm.handleSubmit(onSubmitBio)}
                >
                  Save
                </Button>
              </CardActions>
            </CardOverflow>
          </Card>

          <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
            <Card>
              <Stack spacing={2}>
                <FormControl
                  error={!!passwordForm.formState.errors.previousPassword}
                >
                  <FormLabel>Previous Password</FormLabel>
                  <Input
                    size="sm"
                    type="password"
                    {...passwordForm.register("previousPassword", {
                      required: "Previous password is required",
                    })}
                  />
                  {passwordForm.formState.errors.previousPassword && (
                    <FormHelperText>
                      {passwordForm.formState.errors.previousPassword.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  error={!!passwordForm.formState.errors.newPassword}
                >
                  <FormLabel>New Password</FormLabel>
                  <Input
                    size="sm"
                    type="password"
                    {...passwordForm.register("newPassword", {
                      required: "New password is required",
                    })}
                  />
                  {passwordForm.formState.errors.newPassword && (
                    <FormHelperText>
                      {passwordForm.formState.errors.newPassword.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Stack>

              <CardOverflow
                sx={{ borderTop: "1px solid", borderColor: "divider" }}
              >
                <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                  <Button
                    disabled={passwordForm.formState.isSubmitting}
                    size="sm"
                    variant="solid"
                    type="submit"
                  >
                    Save
                  </Button>
                </CardActions>
              </CardOverflow>
            </Card>
          </form>
        </Stack>
      </Box>
    </Box>
  );
}
const ProfileWithLayout = LayoutPage(MyProfile);
export default ProfileWithLayout;
