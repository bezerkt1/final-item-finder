import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { validateToken } from "../reducers/loginSlice";

const LoginRequired = ({ children }) => {
  const isValid = useSelector((state) => state.isValid);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateToken()).then(() => {
      if (!isValid) {
        return <Navigate to="/" />;
      }
    });
  }, []);

  // User logged in, render the requested route
  return children;
};

export default LoginRequired;
