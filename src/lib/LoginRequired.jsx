import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginRequired = ({ children }) => {
  const accessToken = useSelector((state) => state.isValid);

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  // User logged in, render the requested route
  return children;
};

export default LoginRequired;
