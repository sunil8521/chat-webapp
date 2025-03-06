import { EditRounded, EmailRounded } from "@mui/icons-material";
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
function MyProfile() {
  const { user } = useSelector((state) => state.AUTH);
  const [selectedImage, setSelectedImage] = useState(user?.avtar || null);
  const[forBackend,setForbackend]=useState(null)
  // Forms
  const profileForm = useForm({
    defaultValues: {
      username: user.username,
      fullName: user.fullname,
      email: user.email,
    },
  });

  const bioForm = useForm({
    defaultValues: {
      bio: user.bio || "",
    },
  });

  const passwordForm = useForm({
    defaultValues: {
      previousPassword: "",
      newPassword: "",
    },
  });

  // Handle Image Selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setForbackend(file)
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Handle Form Submissions
  const onSubmitProfile = async(data) => {
    const updatedFields =new FormData();
    console.log(data)
    
    Object.keys(profileForm.formState.dirtyFields).forEach((key) => {
      console.log(key)
      updatedFields.append(key, data[key]);
    });
  
    if (forBackend) updatedFields.append("avtar", forBackend);
    if (!updatedFields.has("avtar") && updatedFields.entries().next().done) {
      console.log("No changes detected.");
      return;
    }

    try {
      const res = await axios.patch("/api/user/updateProfile", updatedFields, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Updated User:", res.data);
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  const onSubmitBio = (data) => {
    console.log("Bio Updated:", data);
  };

  const onSubmitPassword = (data) => {
    console.log("Password Changed:", data);
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
              sx={{ display: {  md: "flex" }, my: 1 }}
            >
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={200}
                  sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
                >
                  <img src={selectedImage} alt="Profile" />

                </AspectRatio>
                <input type="file" id="imageUpload" hidden accept="image/*" onChange={handleImageChange} />
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
                  name="fullName"
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
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  onClick={() => profileForm.reset()}
                >
                  Cancel
                </Button>
                <Button
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
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  onClick={() => bioForm.reset()}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  onClick={bioForm.handleSubmit(onSubmitBio)}                >
                  Save
                </Button>
              </CardActions>
            </CardOverflow>
          </Card>


          <Card>
            <Stack spacing={2}>
                  <Controller
                    name="previousPassword"
                    control={passwordForm.control}
                    render={({ field }) => (
                      <FormControl>
                        <FormLabel>Previous Password</FormLabel>
                        <Input size="sm" type="password" {...field} />
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="newPassword"
                    control={passwordForm.control}
                    render={({ field }) => (
                      <FormControl>
                        <FormLabel>New Password</FormLabel>
                        <Input size="sm" type="password" {...field} />
                      </FormControl>
                    )}
                  />
                </Stack>

            <CardOverflow
              sx={{ borderTop: "1px solid", borderColor: "divider" }}
            >
              <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                <Button
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  onClick={() => passwordForm.reset()}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  onClick={passwordForm.handleSubmit(onSubmitPassword)}
                >
                  Save
                </Button>
              </CardActions>
            </CardOverflow>
          </Card>

        </Stack>
      </Box>
    </Box>
  );
}
const ProfileWithLayout = LayoutPage(MyProfile);
export default ProfileWithLayout;
