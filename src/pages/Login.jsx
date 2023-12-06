// first page user sees
// login or option to register as new user

import { useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import logo from "/lendify.png";

const Login = () => {
  const user = useSelector((store) => store.user);
  //console.log(user.isNew);

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center gap-10 bg-emerald-500">
      <div className="w-1/2">
        <img src={logo} className="rounded-lg"/>
      </div>
      {user.isNew ? (
        <RegisterForm />
      ) : (
        <LoginForm /> 
      )}
        
    </div>
  );
};

export default Login;
