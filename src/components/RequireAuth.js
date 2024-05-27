// component to protect our routes
// The RequireAuth component is a higher-order component that
// protects routes by checking 
// the user's authentication status and roles:



import { useLocation, Navigate, Outlet  } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRoles})  => {
  const {auth} = useAuth(); // 
  const location = useLocation();

  return (
    // comparing values of 2 arrays
    // roles array inside global auth object with all the roles the current user has
    // with the allowredRoles array that is passed into this component
    auth?.roles?.find(role => allowedRoles?.includes(role))     
            ? <Outlet />  // child comps of RequireAuth
            : auth?.user 
              ? <Navigate to="/unauthorized" state={{ from: location }} replace/>
              : <Navigate to="/login" state={{ from: location }} replace/> // navigate away if not
  );
}

export default RequireAuth;