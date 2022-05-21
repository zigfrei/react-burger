import { Redirect, Route, useLocation } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/actions/auth";
import { deleteCookie, setCookie, getCookie } from "../../utils/cookie";
import { RouteProps } from 'react-router';

// export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
//   const { isLoggedIn } = useSelector((state) => state.auth);

//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         isLoggedIn ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// }

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
