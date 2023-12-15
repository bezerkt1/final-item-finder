import { IconContext } from "react-icons";

const Category = ({ icon, name }) => {
  return (
    <div className="flex items-center border-b border-gray-200 p-5">
      <IconContext.Provider
        value={{ size: "2rem", className: "text-zinc-500 mr-3" }}
      >
        {icon}
      </IconContext.Provider>
      <span className="text-lg text-gray-700 font-medium">{name}</span>
    </div>
  );
};

export default Category;
