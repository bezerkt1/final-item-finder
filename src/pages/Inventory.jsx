import { useSelector } from "react-redux";
import { ListGroup } from "flowbite-react";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import Item from "../lib/Item";

const Inventory = () => {
  const items = useSelector((store) => store.items);

  return (
    <div className="flex flex-col min-h-screen">
      <TopAppBar>Your Items</TopAppBar>
      <ListGroup className="w-full lg:mt-5">
        {items.itemsArray?.map(({ name, description, id }) => (
          <Item
            key={id}
            name={name}
            description={description}
            id={id}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
          />
        ))}
      </ListGroup>
      <BottomNavbar />
    </div>
  );
};

export default Inventory;
