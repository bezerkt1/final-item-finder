"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Label, Card, TextInput, Alert } from "flowbite-react";
import { getToken } from "../reducers/loginSlice";
import { setIsNew } from "../reducers/registerSlice";
import CustomButton from "../lib/CustomButton";

const LoginForm = () => {
  const [isValid, setIsValid] = useState(true);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  const handleConfirm = (e) => {
    e.preventDefault();
    dispatch(getToken(loginData)).then(() => {
      if (login.access_token !== null) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    });
  };

  return (
    <>
      {login.token && <h1>{login.token}</h1>}
      <Card className="md:w-2/4 lg:w-1/4 bg-white shadow-md rounded-md p-4">
        <form className="space-y-2">
          <h3 className="text-xl font-medium text-gray-900">Login</h3>
          {!isValid && (
            <Alert color="failure">Wrong username or password</Alert>
          )}
          <div>
            <Label htmlFor="username" value="Username" />
            <TextInput
              id="username"
              type="text"
              value={loginData.username}
              onChange={(event) =>
                setLoginData({ ...loginData, username: event.target.value })
              }
              required
              autoComplete="username"
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
              required
              autoComplete="current-password"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <CustomButton
              color="success"
              disabled={!isValid}
              onClick={(e) => handleConfirm(e)}
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Confirm
            </CustomButton>
            <p className="text-sm">
              Not a member? Click{" "}
              <button
                id="registerBtn"
                className="underline text-blue-500 focus:outline-none"
                onClick={() => dispatch(setIsNew())}
              >
                here
              </button>
            </p>
          </div>
        </form>
      </Card>
    </>
  );
};

export default LoginForm;
