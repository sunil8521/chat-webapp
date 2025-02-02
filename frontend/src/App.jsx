import { lazy,Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth";

const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const WelcomeMessageWithLayout = lazy(() => import("./pages/WelcomeMessage"));
const MessagesPaneWithLayout = lazy(() => import("./pages/MessagesPane"));


import { Global_var_provider } from "./context/context";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteUser, setUser } from "./redux/reducer/auth";
import axios from "axios";
import Loader from "./shared/Loader";

function App() {
  const { user, loading } = useSelector((state) => state.AUTH);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVERURL}/api/user/me`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        dispatch(setUser(data));
      })
      .catch((er) => {
        dispatch(deleteUser());
      });
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <BrowserRouter>
      <Suspense fallback={<Loader/>}>
        <Routes>

          <Route element={<Auth user={user} />}>
          
            <Route
              path="/chat"
              element={
                <Global_var_provider>
                  <WelcomeMessageWithLayout />
                </Global_var_provider>
              }
            />
            <Route
              path="/chat/:id"
              element={
                <Global_var_provider>
                  <MessagesPaneWithLayout />
                </Global_var_provider>
              }
            />
          </Route>

          <Route
            path="/"
            element={
              <Auth user={!user} redirect="/chat">
                <LandingPage />
              </Auth>
            }
          />
          <Route
            path="/signup"
            element={
              <Auth user={!user} redirect="/chat">
                <SignUpPage />
              </Auth>
            }
          />
          <Route
            path="/signin"
            element={
              <Auth user={!user} redirect="/chat">
                <SignInPage />
              </Auth>
            }
          />
          <Route path="*" element={<Navigate to={"/"} />} />



        </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
