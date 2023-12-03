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
        // does this mean username + password authenticated? yes, well guessed! although I might look into a better way of checking
        // updated to check if null instead
        setIsOpen(false); // if yes, navigate to home page
      } else {
        setIsValid(false);
      }
    });
  };

  return (
    <>
      {login.token && <h1>{login.token}</h1>}
      <Card className="md:w-2/4 lg:w-1/4">
        <form className="space-y-2">
          <h3 className="text-xl mx-auto font-medium text-gray-900 dark:text-white">
            Login
          </h3>
          {!isValid && (
            <Alert color="failure">Wrong username or password</Alert>
          )}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              type="text"
              value={loginData.username}
              onChange={(event) =>
                setLoginData({ ...loginData, username: event.target.value })
              }
              required
              autoComplete="username"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              value={loginData.password}
              onChange={(event) =>
                setLoginData({ ...loginData, password: event.target.value })
              }
              required
              autoComplete="current-password"
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <CustomButton
              color="success"
              className="bg-emerald-500"
              disabled={!isValid}
              onClick={(e) => handleConfirm(e)}
              type="submit"
            >
              Confirm
            </CustomButton>
            <p className="text-xs">
              Not a member? Click{" "}
              <button
                className="underline"
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
