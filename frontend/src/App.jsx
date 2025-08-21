import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth";



import { Global_var_provider } from "./context/context";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteUser, setUser } from "./redux/reducer/auth";
import axios from "axios";
import Loader from "./shared/Loader";
import { routes } from "./routes/routes";



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
        <Suspense fallback={<Loader />}>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.authRequired ? (
                    <Auth user={user}>
                      <Global_var_provider>{route.element}</Global_var_provider>
                    </Auth>
                  ) : (
                    <Auth user={!user} redirect="/home">
                      {route.element}
                    </Auth>
                  )
                }
              />
            ))}
            <Route path="*" element={<Navigate to={"/"} />} />
 

          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;




 {/* <Route element={<Auth user={user} />}>
          
            <Route
              path="/home"
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
            <Route
              path="/profile"
              element={
                <Global_var_provider>
                  <MyProfile />
                </Global_var_provider>
              }
            />
          </Route> */}

          {/* <Route
            path="/"
            element={
              <Auth user={!user} redirect="/home">
                <LandingPage />
              </Auth>
            }
          />
          <Route
            path="/signup"
            element={
              <Auth user={!user} redirect="/home">
                <SignUpPage />
              </Auth>
            }
          />
          <Route
            path="/signin"
            element={
              <Auth user={!user} redirect="/home">
                <SignInPage />
              </Auth>
            }
          /> */}