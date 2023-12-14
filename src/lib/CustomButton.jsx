import { Button } from "flowbite-react";

const CustomButton = ({ children, color, className, onClick, type }) => {
  let buttonColor = "";

  // Set button color based on the prop received
  switch (color) {
    case "success":
      buttonColor = "bg-green-700 hover:bg-green-800 text-white";
      break;
    case "primary":
      buttonColor = "bg-blue-700 hover:bg-blue-800 text-white";
      break;
    // Add more cases as per your color variations
    default:
      buttonColor = "bg-gray-700 hover:bg-gray-800 text-white";
      break;
  }

  return (
    <div>
      <Button
        className={`py-3 px-6 rounded-lg ${buttonColor} ${className}`}
        onClick={onClick}
        type={type}
        pill
      >
        {children}
      </Button>
    </div>
  );
};

export default CustomButton;
