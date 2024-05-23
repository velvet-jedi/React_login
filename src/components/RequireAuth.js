// component to protect our routes

import { useLocation, Navigate, Outlet  } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ()  => {
  const {auth} = useAuth(); // 
  const location = useLocation();

  return (
    auth?.user     // auth object exists and the user property ?
            ? <Outlet />  // child comps of RequireAuth
            : <Navigate to="/login" state={{ from: location }} replace/>
  );
}

export default RequireAuth;