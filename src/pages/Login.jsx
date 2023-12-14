import { useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import logo from "/logo-white.svg";

const Login = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center gap-10 bg-emerald-500">
      <div className="w-3/4 h-1/5 max-w-sm border-red-500">
        <img src={logo} className="w-full rounded-lg" alt="Logo" />
      </div>
     
          {user.isNew ? <RegisterForm /> : <LoginForm />}
        
    </div>
  );
};

export default Login;
