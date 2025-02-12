import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  Link,
  Sheet,
  Typography
} from "@mui/joy";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { setUser } from "../redux/reducer/auth";
export default function SignInPage() {
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();


  const onSubmit = async(data) => {
   try{
    const res= await axios.post(`${import.meta.env.VITE_SERVERURL}/api/user/signin`,data,{withCredentials:true})
    const userData= await axios.get(`${import.meta.env.VITE_SERVERURL}/api/user/me`,{withCredentials:true})
    dispatch(setUser(userData.data))
    
   }catch(er){
    console.log(er)
    toast.error(er?.response?.data?.message||"Something went wrong")

   }
  };
  return (
<Box
  sx={{
    minHeight: "100dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "background.body", // Theme-aware background color
  }}
>
  <Sheet
    variant="outlined"
    sx={{
      width: 400,
      p: 4,
      borderRadius: "md",
      boxShadow: "lg",
      bgcolor: "background.surface", // Theme-aware background color
    }}
  >
    <Typography
      level="h2"
      component="h2"
      sx={{
        mb: 2,
        textAlign: "center",
        fontWeight: "bold",
        color: "text.primary", // Theme-aware text color
      }}
    >
      Sign in
    </Typography>

    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl error={!!errors.email}>
        <Input
          autoFocus
          placeholder={errors.email ? errors.email.message : "Email"}
          type="email"
          fullWidth
          sx={{
            mb: 2,
            bgcolor: "background.level1", // Theme-aware background color
            borderColor: "neutral.outlinedBorder", // Theme-aware border color
            "&:hover": { borderColor: "primary.outlinedHoverBorder" }, // Theme-aware hover color
          }}
          {...register("email", {
            required: "Email is required",
          })}
        />
      </FormControl>

      <FormControl error={!!errors.password}>
        <Input
          placeholder={errors.password ? errors.password.message : "Password"}
          type="password"
          fullWidth
          sx={{
            mb: 2,
            bgcolor: "background.level1", // Theme-aware background color
            borderColor: "neutral.outlinedBorder", // Theme-aware border color
            "&:hover": { borderColor: "primary.outlinedHoverBorder" }, // Theme-aware hover color
          }}
          {...register("password", {
            required: "Password is required",
          })}
        />
      </FormControl>

      <Button
        type="submit"
        fullWidth
        sx={{
          mb: 2,
          bgcolor: "primary.500", // Theme-aware button color
          "&:hover": { bgcolor: "primary.600" }, // Theme-aware hover color
        }}
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        Sign in
      </Button>
    </form>

    <Typography
      level="body-sm"
      sx={{
        textAlign: "center",
        color: "text.secondary", // Theme-aware text color
        mb: 2,
      }}
    >
      <Link
        component={RouterLink}
        to="/signup"
        sx={{ textDecoration: "none", color: "primary.500" }} // Theme-aware link color
      >
        Forgot your password?
      </Link>
    </Typography>

    <Divider sx={{ mb: 2, color: "divider" }}>or</Divider> {/* Theme-aware divider color */}

    <Typography
      level="body-sm"
      sx={{
        textAlign: "center",
        color: "text.secondary", // Theme-aware text color
      }}
    >
      {"Don't have an account?"}{" "}
      <Link
        component={RouterLink}
        to="/signup"
        sx={{ textDecoration: "none", color: "primary.500" }} // Theme-aware link color
      >
        Sign up
      </Link>
    </Typography>
  </Sheet>
</Box>
  );
}
