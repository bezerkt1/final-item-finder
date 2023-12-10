import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../reducers/loginSlice";

const LoginRequired = ({ children }) => {
  const isValid = useSelector((state) => state.isValid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(validateToken()).then(() => {
      if (!isValid) {
        navigate("/");
      }
    });
  }, [dispatch, navigate, isValid]);

  // User logged in, render the requested route
  return isValid ? children : null;
};

export default LoginRequired;
