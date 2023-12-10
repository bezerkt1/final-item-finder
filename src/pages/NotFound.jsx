import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { PiBinocularsFill } from "react-icons/pi";
import CustomButton from "../lib/CustomButton";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-10 bg-emerald-500 text-white">
      <div className="flex flex-col items-center">
        <IconContext.Provider value={{ size: "5rem" }}>
          <PiBinocularsFill />
        </IconContext.Provider>
        <p className="text-xl font-semibold">We couldn't find that page.</p>
        <p>Try one of these links instead.</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <CustomButton
          color="success"
          className="bg-green-500 text-white"
          onClick={() => navigate("/home")}
        >
          Go to Home page
        </CustomButton>

        <CustomButton
          color="success"
          className="bg-green-500 text-white"
          onClick={() => navigate("/search")}
        >
          Go to Search page
        </CustomButton>
      </div>
    </div>
  );
};

export default NotFound;
