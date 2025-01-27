import { useContext } from "react";
import { useGlobalVar } from "./context/ContextUse";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth"
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";
import { Global_var_provider } from "./context/context";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import {deleteUser,setUser} from "./redux/reducer/auth"
import axios from "axios"
import Loader from "./shared/Loader";

function App() {
  const { user,loading } = useSelector((state) => state.AUTH);
  const dispatch = useDispatch();

 useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_SERVERURL}/api/user/me`, { withCredentials: true })
        .then(({ data }) => {
          dispatch(setUser(data));
        })
        .catch((er) => {
          dispatch(deleteUser());
        });
  }, [dispatch]);

  return loading ?(<Loader/>): (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Auth user={user}/>}>

          <Route path="/chat" element={<Global_var_provider><HomePage /></Global_var_provider>} />
          <Route path="/chat/:id" element={<Global_var_provider><h1>hello this is a page</h1></Global_var_provider>} />
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
