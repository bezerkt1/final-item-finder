import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../reducers/loginSlice'; // adjust the import path as needed

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    // Additional actions upon logout if needed
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;