// form to register new user

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Label, Card, TextInput, Alert } from "flowbite-react";
import { setIsNew } from "../reducers/registerSlice";
import CustomButton from "../lib/CustomButton";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [alert, setAlert] = useState({ show: false, color: "", text: "" });
  // empty form for now, need to add logic later
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("http://basternet.ddns.net:8777/users/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.status === 200) {
        setAlert({
          show: true,
          color: "success",
          text: "Successfully created user! You may now log in.",
        });
      } else {
        response.json().then((data) => {
          let message = data.detail;
          if (!message) {
            message = "Sorry. Something went wrong.";
          }
          setAlert({ show: true, color: "failure", text: message });
        });
      }
    });
  };

  return (
    <>
      <Card className="md:w-2/4 lg:w-1/4">
        <form className="space-y-2" onSubmit={() => handleRegister()}>
          <h3 className="text-xl mx-auto font-medium text-gray-900 dark:text-white">
            Register New User
          </h3>
          {alert.show && <Alert color={alert.color}>{alert.text}</Alert>}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="username" />
            </div>
            <TextInput
              id="username"
              type="text"
              value={formData.username}
              onChange={(event) =>
                setFormData({ ...formData, username: event.target.value })
              }
              required
              autoComplete="username"
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              value={formData.password}
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
              required
              autoComplete="new-password"
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            <CustomButton
              color="success"
              className="bg-emerald-500"
              onClick={(e) => handleRegister(e)}
              type="submit"
            >
              Confirm
            </CustomButton>
            <p className="text-xs">
              Already a member? Click{" "}
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

export default RegisterForm;
