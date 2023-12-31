import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Label, Card, TextInput, Alert } from "flowbite-react";
import { setIsNew, setAlert } from "../reducers/registerSlice";
import { API_URL } from "../config/config";
import CustomButton from "../lib/CustomButton";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/users/`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.status === 200) {
        dispatch(
          setAlert({
            show: true,
            color: "success",
            text: "Successfully created user! You may now log in.",
          })
        );
        dispatch(setIsNew());
      } else {
        response.json().then((data) => {
          let message = data.detail;
          if (!message) {
            message = "Sorry. Something went wrong.";
          }
          dispatch(setAlert({ show: true, color: "failure", text: message }));
        });
      }
    });
  };

  return (
    <>
      <Card className="md:w-2/4 lg:w-1/4 bg-white shadow-md rounded-md p-4">
        <form className="space-y-2" onSubmit={(e) => handleRegister(e)}>
          <h3 className="text-xl font-medium text-gray-900">
            Register New User
          </h3>
          {user.alert.show && (
            <Alert color={user.alert.color}>{user.alert.text}</Alert>
          )}
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="username" value="Username" />
            <TextInput
              id="username"
              type="text"
              value={formData.username}
              onChange={(event) =>
                setFormData({ ...formData, username: event.target.value })
              }
              required
              autoComplete="username"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              value={formData.password}
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
              required
              autoComplete="new-password"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            <CustomButton
              id="confirmBtn"
              color="success"
              onClick={(e) => handleRegister(e)}
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Confirm
            </CustomButton>
            <p className="text-sm">
              Already a member? Click{" "}
              <button
                id="loginBtn"
                className="underline focus:outline-none"
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
