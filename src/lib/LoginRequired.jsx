import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  Navigate } from "react-router-dom";
import { validateToken } from "../reducers/loginSlice";

const LoginRequired = ({ children }) => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  
  useEffect(() => {
    if (login.isValid) {
      dispatch(validateToken());
    }
  }, [login.isValid]);



  // User logged in, render the requested route
  // else navigate to login page
  
  return login.isValid ? children : <Navigate to="/" />;
};

export default LoginRequired;
