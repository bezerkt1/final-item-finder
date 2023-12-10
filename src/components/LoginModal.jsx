"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { getToken } from "../reducers/loginSlice";

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  useEffect(() => {
    setIsValid(loginData.username.length > 0);
  }, [loginData.username]);

  const handleConfirm = () => {
    dispatch(getToken(loginData)).then(() => {
      if (login.access_token.length > 1) {
        setIsOpen(false);
      }
    });
  };

  return (
    <>
      {login.token && <h1>{login.token}</h1>}
      <Button onClick={() => setIsOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">
        Login
      </Button>
      <Modal
        dismissible
        show={isOpen}
        size="md"
        onClose={() => setIsOpen(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900">Login</h3>
            <div>
              <Label htmlFor="username" value="Username" />
              <TextInput
                id="username"
                value={loginData.username}
                onChange={(event) =>
                  setLoginData({ ...loginData, username: event.target.value })
                }
                required
                color={!isValid && "failure"}
                helperText={!isValid && "Please enter a username"}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="password" value="Your password" />
              <TextInput
                id="password"
                type="password"
                value={loginData.password}
                onChange={(event) =>
                  setLoginData({ ...loginData, password: event.target.value })
                }
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-full">
              <Button
                disabled={!isValid}
                onClick={() => handleConfirm()}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Confirm
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
