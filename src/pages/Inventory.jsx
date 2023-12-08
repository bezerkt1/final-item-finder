// list of newly added items
// map through items and sort by newest
// copy html structure in CustomList.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyItems } from "../reducers/itemSlice";
import { ListGroup } from "flowbite-react";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import Item from "../lib/Item";

const Inventory = () => {
  const myItems = useSelector((store) => store.items.myItems);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMyItems());
  }, []);

  return (
    <>
      <TopAppBar>Your items</TopAppBar>
      {/* List of items added by user */}
      <ListGroup className="w-screen rounded-none">
        {myItems?.map(({ name, description, id }) => (
          <Item key={id} name={name} description={description} id={id} />
        ))}
      </ListGroup>
      <BottomNavbar />
    </>
  );
};

export default Inventory;
