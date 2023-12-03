import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/loginSlice'; // adjust the import path as needed

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // Additional actions upon logout if needed
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;