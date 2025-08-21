import { Navigate, Outlet } from "react-router-dom";



const Auth = ({ children, user, redirect = "/" }) => {

  if (!user) return <Navigate to={redirect} replace />;
  return children ? children : <Outlet />;
};


export default Auth
