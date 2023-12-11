import { useSelector } from "react-redux";
import {  Navigate } from "react-router-dom";

const LoginRequired = ({ children }) => {
  const isValid = useSelector((state) => state.isValid);

  // User logged in, render the requested route
  // else navigate to login page
  const login = useSelector((state) => state.login);
  return login.isValid ? children : <Navigate to="/" />;
};

export default LoginRequired;
