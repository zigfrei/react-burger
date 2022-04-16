import { Redirect, Route, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/actions/auth";
import { deleteCookie, setCookie, getCookie } from "../../utils/cookie";

export function ProtectedRoute({ children, ...rest }) {
  const { getUserSuccess, userName, userEmail } = useSelector(
    (state) => state.auth
  );


  const dispatch = useDispatch();

  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    setUserLoaded(true);
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("refreshToken") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
