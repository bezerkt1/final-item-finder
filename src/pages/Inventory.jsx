// list of newly added items
// map through items and sort by newest
// copy html structure in CustomList.jsx
import { useSelector } from "react-redux";
import { ListGroup } from "flowbite-react";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import Item from "../lib/Item";

const Inventory = () => {
  const items = useSelector((store) => store.items);
  console.log(items);

  return (
    <>
      <TopAppBar>Your items</TopAppBar>
      {/* List of items added by user */}
      <ListGroup className="w-screen rounded-none">
        {items?.map(({ name, description, id }) => (
          <Item key={id} name={name} description={description} id={id}  />
        ))}
      </ListGroup>
      <BottomNavbar />
    </>
  );
};

export default Inventory;