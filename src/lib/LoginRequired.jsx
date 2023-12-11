import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { validateToken } from "../reducers/loginSlice";

const LoginRequired = ({ children }) => {
  const isValid = useSelector((state) => state.isValid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(validateToken()).then(() => {
  //     if (!isValid) {
  //       navigate("/");
  //     }
  //   });
  // }, [dispatch, navigate, isValid]);

  // User logged in, render the requested route

  const login = useSelector((state) => state.login);
  return login.isValid ? children : <Navigate to="/" />;
};

export default LoginRequired;
