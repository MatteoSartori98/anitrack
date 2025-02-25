/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router";
import SessionContext from "../../context/Session/SessionContext";

const AuthedRoute = ({ children }) => {
  const { session } = useContext(SessionContext);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthedRoute;
