// default not found pg
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { PiBinocularsFill } from "react-icons/pi";
import CustomButton from "../lib/CustomButton";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col h-screen justify-center gap-10">
      <div className="flex flex-col items-center">
        <IconContext.Provider value={{ size: "5rem" }}>
          <PiBinocularsFill />
        </IconContext.Provider>
        <p>We couldn't find that page.</p>
        <p>Try one of these links instead.</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <CustomButton
          color="success"
          className="bg-emerald-500"
          onClick={() => navigate("/home")}
        >
          Go to Home page
        </CustomButton>
        
        <CustomButton
          color="success"
          className="bg-emerald-500"
          onClick={() => navigate("/search")}
        >
          Go to Search page
        </CustomButton>
      </div>
    </div>
  );
};

export default NotFound;
