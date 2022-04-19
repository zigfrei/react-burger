import { Redirect, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/actions/auth";
import { deleteCookie, setCookie, getCookie } from "../../utils/cookie";

export function ProtectedRoute({ children, ...rest }) {
  const { isLoggedIn, userName, userEmail } = useSelector(
    (state) => state.auth
  );

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
