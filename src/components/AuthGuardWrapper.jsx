import { useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";


const AuthGuardWrapper = () => {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  
  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ previousPath: location.pathname }} />
  );
};

export default AuthGuardWrapper;
