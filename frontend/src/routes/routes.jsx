import { lazy } from "react";

const SignInPage = lazy(() => import("../pages/SignInPage"));
const SignUpPage = lazy(() => import("../pages/SignUpPage"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const WelcomeMessageWithLayout = lazy(() =>
  import("../pages/PagesWithLayout/WelcomeMessage")
);
const MessagesPaneWithLayout = lazy(() =>
  import("../pages/PagesWithLayout/MessagesPane")
);
const MyProfile = lazy(() => import("../pages/PagesWithLayout/Profile"));

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import Person from "@mui/icons-material/Person";

export const routes = [
  {
    path: "/",
    element: <LandingPage />,
    authRequired: false,
    sidebar: false,
  },
  {
    path: "/home",
    element: <WelcomeMessageWithLayout />,
    authRequired: true,
    sidebar: { label: "Home", icon: <HomeRoundedIcon /> },
  },
  {
    path: "/chat/:id",
    element: <MessagesPaneWithLayout />,
    authRequired: true,
    sidebar: { label: "Chats", icon: <QuestionAnswerRoundedIcon /> },
  },
  {
    path: "/profile",
    element: <MyProfile />,
    authRequired: true,
    sidebar: { label: "Profile", icon: <Person /> },
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    authRequired: false,
    sidebar: false,
  },
  {
    path: "/signin",
    element: <SignInPage />,
    authRequired: false,
    sidebar: false,
  },
];
