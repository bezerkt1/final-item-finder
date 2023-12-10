import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyItems } from "../reducers/itemSlice";
import { ListGroup } from "flowbite-react";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import Item from "../lib/Item";

const Inventory = () => {
  const myItems = useSelector((state) => state.items.myItems);
  const itemsArray = useSelector((state) => state.items.itemsArray);
  const dispatch = useDispatch();

  // !! adding myItems to dependency causes an infinite loop
  // not sure how to make pg refresh upon change in myItems state otherwise
  // tried useRef to save prev state, tried isLoading global state, still won't refresh...
  useEffect(() => {
    dispatch(getMyItems());
  }, [itemsArray]);

  return (
    <>
      <TopAppBar>Your items</TopAppBar>
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
