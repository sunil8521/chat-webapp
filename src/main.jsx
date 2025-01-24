import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import {Toaster} from "react-hot-toast"
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <>

    {/* <Global_var_provider> */}
     <CssVarsProvider disableTransitionOnChange>
      <CssBaseline/>
      <Toaster  position="top-right"/>
      <App />
    </CssVarsProvider>
    {/* </Global_var_provider> */}
    </>


  // </StrictMode>
);
