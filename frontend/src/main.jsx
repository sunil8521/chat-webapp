import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import {Toaster} from "react-hot-toast"
import {Provider} from "react-redux"
import store from "./redux/store.js"
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>

     <CssVarsProvider disableTransitionOnChange>
      <CssBaseline/>
      <Toaster  position="top-right"/>


      <App />

    </CssVarsProvider>
    </Provider>


  // </StrictMode>
);
