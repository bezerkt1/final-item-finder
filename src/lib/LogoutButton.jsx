import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducers/loginSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    // Additional actions upon logout if needed
  };

  return (
    <button
      id="logoutBtn"
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
