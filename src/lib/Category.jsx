import { ListGroup } from "flowbite-react";
import { IconContext } from "react-icons";

const Category = ({ icon, name }) => {
  return (
    <ListGroup.Item className="text-zinc-500" >
      <div className="flex gap-5 h-20 items-center">
        <IconContext.Provider value={{ size: "2rem" }}>
          {icon}
        </IconContext.Provider>
        {name}
      </div>
    </ListGroup.Item>
  );
};

export default Category;
