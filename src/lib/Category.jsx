import { ListGroup } from "flowbite-react";
import { IconContext } from "react-icons";

const Category = ({ icon, name }) => {
  return (
    <ListGroup.Item className="w-full border-b border-gray-200">
      <div className="flex items-center py-3">
        <IconContext.Provider value={{ size: "2rem", className: "text-zinc-500 mr-3" }}>
          {icon}
        </IconContext.Provider>
        <span className="text-lg text-gray-700 font-medium">{name}</span>
      </div>
    </ListGroup.Item>
  );
};

export default Category;
