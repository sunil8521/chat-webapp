import { useState } from "react";
import {
  Box,
  Sheet,
  Typography,
  Snackbar,
  FormHelperText,
  FormControl,
  Input,
  Button,
  Divider,
  Link,
  IconButton,
} from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from "axios"
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducer/auth";
export default function SignInPage() {

const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = async(data) => {
    try{
     const res= await axios.post(`${import.meta.env.VITE_SERVERURL}/api/user/signup`,data,{withCredentials:true})
     const userData= await axios.get(`${import.meta.env.VITE_SERVERURL}/api/user/me`,{withCredentials:true})
     dispatch(setUser(userData.data))
     
    }catch(er){
     toast.error(er.response.data.message||"Something went wrong")
 
    }
   };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "neutral.900",
      }}
    >

      <Sheet
        variant="outlined"
        sx={{
          width: 400,
          p: 4,
          borderRadius: "md",
          boxShadow: "lg",
          bgcolor: "neutral.800",
        }}
       
        
      >
        <Typography
          level="h2"
          component="h2"
          sx={{
            mb: 2,
            textAlign: "center",
            fontWeight: "bold",
            color: "neutral.100",
          }}
        >
          Sign up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl error={!!errors.fullname}>
            <Input
              placeholder="Full Name"
              type="text"
              fullWidth
              sx={{
                color:"white",
                mt: 2,
                bgcolor: "neutral.700",
                borderColor: "neutral.600",
                "&:hover": { borderColor: "neutral.500" },
              }}
              {...register("fullname", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Full name must be at least 3 characters long",
                },
                maxLength: {
                  value: 50,
                  message: "Full name must not exceed 50 characters",
                },
              })}
            />
            {errors.fullname && (
              <FormHelperText sx={{ m: 0 }}>
                {errors.fullname.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.username}>
            <Input
              placeholder="@Username"
              type="text"
              fullWidth
              sx={{
                color:"white",
                mt: 2,
                bgcolor: "neutral.700",
                borderColor: "neutral.600",
                "&:hover": { borderColor: "neutral.500" },
              }}
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^\S*$/,
                  message: "Username must not contain spaces",
                },
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Username must not exceed 20 characters",
                },
              })}
            />
            {errors.username && (
              <FormHelperText sx={{ m: 0 }}>
                {errors.username.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.email}>
            <Input
              placeholder="Email"
              type="email"
              fullWidth
              sx={{
                color:"white",
                mt: 2,
                bgcolor: "neutral.700",
                borderColor: "neutral.600",
                "&:hover": { borderColor: "neutral.500" },
              }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <FormHelperText sx={{ m: 0 }}>
                {errors.email.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.password}>
            <Input
              placeholder="Password"
              type="password"
              fullWidth
              sx={{
                color:"white",
                mt: 2,
                bgcolor: "neutral.700",
                borderColor: "neutral.600",
                "&:hover": { borderColor: "neutral.500" },
              }}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                maxLength: {
                  value: 30,
                  message: "Password must not exceed 30 characters",
                },
                pattern: {
                  value: /^\S*$/,
                  message: "Username must not contain spaces",
                },
              })}
            />
            {errors.password && (
              <FormHelperText sx={{ m: 0 }}>
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="solid"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "primary.500",
              "&:hover": { bgcolor: "primary.600" },
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
            color: "neutral.300",
            mt: 2,
          }}
        >
          <Link
            component={RouterLink}
            to="/signin"
            sx={{ textDecoration: "none", color: "primary.600" }}
          >
            Forgot your password?
          </Link>
        </Typography>
        <Divider sx={{ mt: 2, color: "neutral.600" }}>or</Divider>
        <Typography
          level="body-sm"
          sx={{
            textAlign: "center",
            color: "neutral.300",
          }}
        >
          {"Don't have an account?"}{" "}
          <Link
            component={RouterLink}
            to="/signin"
            sx={{ mt: 2, textDecoration: "none", color: "primary.400" }}
          >
            Sign in
          </Link>
        </Typography>
      </Sheet>
    </Box>
  );
}
