import * as React from "react";
import {
  Box,
  Sheet,
  Typography,
  FormControl,
  FormHelperText,
  Input,
  Button,
  Divider,
  Link,
} from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux";
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
    toast.error(er.response?.data?.message||"Something went wrong")

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
                color:"white",
                mb: 2,
                bgcolor: "neutral.700",
                borderColor: "neutral.600",
                "&:hover": { borderColor: "neutral.500" },
                
              }}
              {...register("email", {
                required: "Email is required",
              })}
            />
          </FormControl>
          <FormControl error={!!errors.password}>
            <Input
              placeholder={
                errors.password ? errors.password.message : "Password"
              }
              type="password"
              fullWidth
              sx={{
                mb: 2,
                color:"white",
                bgcolor: "neutral.700",
                borderColor: "neutral.600",
                "&:hover": { borderColor: "neutral.500" },
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
              // bgcolor: "primary.500",
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
            mb: 2,
          }}
        >
          <Link
            component={RouterLink}
            to="/signup"
            sx={{ textDecoration: "none", color: "primary.600" }}
          >
            Forgot your password?
          </Link>
        </Typography>
        <Divider sx={{ mb: 2, color: "neutral.600" }}>or</Divider>
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
            to="/signup"
            sx={{ textDecoration: "none", color: "primary.400" }}
          >
            Sign up
          </Link>
        </Typography>
      </Sheet>
    </Box>
  );
}
