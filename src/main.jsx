import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Global_var_provider } from "./context/context";
import { CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Global_var_provider>
     <CssVarsProvider disableTransitionOnChange>
      <CssBaseline/>
      <App />
    </CssVarsProvider>
    </Global_var_provider>
  </StrictMode>
);
