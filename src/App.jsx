import { useContext } from "react";
import { useGlobalVar } from "./context/ContextUse";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth"
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";
import { Global_var_provider } from "./context/context";

const user=true
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Auth user={user}/>}>

          <Route path="/chat" element={<Global_var_provider><HomePage /></Global_var_provider>} />
          </Route>


          <Route path="/" element={<Auth user={!user} redirect="/chat"><LandingPage /></Auth>} />
          <Route path="/signup" element={<Auth user={!user} redirect="/chat"><SignUpPage /></Auth>} />
          <Route path="/signin" element={<Auth user={!user} redirect="/chat"><SignInPage /></Auth>} />

          <Route path="*" element={<Navigate to={"/"} />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
