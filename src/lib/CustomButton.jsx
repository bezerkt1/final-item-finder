import { Button } from "flowbite-react";

const CustomButton = ({ children, color, className, onClick, type }) => {
  let buttonColor = "";

  // Set button color based on the prop received
  switch (color) {
    case "success":
      buttonColor = "bg-green-500 hover:bg-green-600 text-white";
      break;
    case "primary":
      buttonColor = "bg-blue-500 hover:bg-blue-600 text-white";
      break;
    // Add more cases as per your color variations
    default:
      buttonColor = "bg-gray-500 hover:bg-gray-600 text-white";
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
