import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../Context/Context";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(UserContext);
  const saveUserInfo = localStorage.getItem("user");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email || saveUserInfo ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
