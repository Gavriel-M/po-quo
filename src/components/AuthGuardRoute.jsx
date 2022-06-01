import { useSelector } from "react-redux";
import { Route, useNavigate, Navigate,  useLocation } from "react-router-dom";

const AuthGuardRoute = ({ children }) => {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  
  const navigate = useNavigate();

/* 
  const notAuthorized = () => {
    navigate("/login", {
      state: {
        previousPath: location.pathname,
      },
    });
  }; */
  if (!loggedIn) {
     return <Navigate
            to={{
              pathname: "/login",
              state: { previousPath: location.pathname },
            }}
          />
  }
  return children;

  /* 
  return (
    <Route
      render={(props) =>
        loggedIn === true ? (
          <Component />
        ) : (
          <Navigate
            to={{
              pathname: "/login",
              state: { previousPath: location.pathname },
            }}
          />
        )
      }
    ></Route>
  ); */
};

export default AuthGuardRoute;
