import { EditRounded, EmailRounded } from '@mui/icons-material';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { Controller, useForm } from 'react-hook-form';
import LayoutPage from "../../components/Layouts/LayoutPage";

 function MyProfile() {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      fullName: 'John Doe',
      email: 'siriwatk@test.com',
      bio: "I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript.",
      timezone: '1',
      previousPassword: '',
      newPassword: '',
      socialLinks: '',
      status: 'Available',
    },
  });
  const onSubmit = (data) => {
    console.log('Form Data Submitted:', data);
  };
  return (
    <Box
    component="main"
    className="MainContent"
    sx={{
      pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
      pb: { xs: 2, sm: 2, md: 3 },
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      height: '100dvh',
      gap: 1,
      overflow: 'auto',
    }}
  >
    <Box sx={{ flex: 1, width: '100%' }}>
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        {/* Personal Info Card */}
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will appear to the networks.
            </Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                  srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: 'background.body',
                  position: 'absolute',
                  zIndex: 2,
                  borderRadius: '50%',
                  left: 100,
                  top: 170,
                  boxShadow: 'sm',
                }}
              >
                <EditRounded />
              </IconButton>
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              {/* Full Name Field */}
              <Controller
                name="fullName"
                control={control}
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
                control={control}
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

              {/* Change Password Section */}
              <Stack spacing={2}>
                <Typography level="title-sm">Change Password</Typography>
                <Controller
                  name="previousPassword"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>Previous Password</FormLabel>
                      <Input size="sm" type="password" {...field} />
                    </FormControl>
                  )}
                />
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>New Password</FormLabel>
                      <Input size="sm" type="password" {...field} />
                    </FormControl>
                  )}
                />
              </Stack>
            </Stack>
          </Stack>

          {/* Mobile View */}
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
          >
            {/* Full Name Field */}
            <Controller
              name="fullName"
              control={control}
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
              control={control}
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

            {/* Change Password Section */}
            <Stack spacing={2}>
              <Typography level="title-sm">Change Password</Typography>
              <Controller
                name="previousPassword"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Previous Password</FormLabel>
                    <Input size="sm" type="password" {...field} />
                  </FormControl>
                )}
              />
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>New Password</FormLabel>
                    <Input size="sm" type="password" {...field} />
                  </FormControl>
                )}
              />
            </Stack>
          </Stack>

          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral" onClick={() => reset()}>
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={handleSubmit(onSubmit)}>
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
              control={control}
              render={({ field }) => (
                <Textarea size="sm" minRows={4} sx={{ mt: 1.5 }} {...field} />
              )}
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
              275 characters left
            </FormHelperText>
          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral" onClick={() => reset()}>
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>

        {/* Social Links and Status Card */}
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Social Links & Status</Typography>
            <Typography level="body-sm">
              Add your social links and update your status.
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <Controller
              name="socialLinks"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel>Social Links</FormLabel>
                  <Input size="sm" {...field} />
                </FormControl>
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select size="sm" {...field}>
                    <Option value="Available">Available</Option>
                    <Option value="Busy">Busy</Option>
                    <Option value="Away">Away</Option>
                  </Select>
                </FormControl>
              )}
            />
          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral" onClick={() => reset()}>
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={handleSubmit(onSubmit)}>
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
const ProfileWithLayout=LayoutPage(MyProfile)
export default ProfileWithLayout