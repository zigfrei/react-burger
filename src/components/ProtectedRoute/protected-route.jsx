import { Redirect, Route } from "react-router-dom";
import { useSelector } from "../../services/hooks";

export function ProtectedRoute({ children, ...rest }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
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
