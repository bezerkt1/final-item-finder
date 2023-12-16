import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { persistor } from "../store";
import { getMyItems } from "../reducers/itemSlice";
import { ListGroup } from "flowbite-react";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import Item from "../lib/Item";
import ItemMessage from "../lib/ItemMessage";

const Inventory = () => {
  const myItems = useSelector((state) => state.items.myItems);
  const selectedItem = useSelector((state) => state.items.selectedItem);

  const itemsArray = useSelector((state) => state.items.itemsArray);
  const dispatch = useDispatch();

  // !! adding myItems to dependency causes an infinite loop
  // not sure how to make pg refresh upon change in myItems state otherwise
  // tried useRef to save prev state, tried isLoading global state, still won't refresh...
  useEffect(() => {
    dispatch(getMyItems());

    if (persistor.getState().myItems) {
      dispatch(getMyItems());
    }
  }, [itemsArray]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopAppBar>Your Items</TopAppBar>
      <div id="inventory" className="relative">
        <ListGroup className="w-full lg:mt-5">
          {myItems?.map(({ name, description, id }) => (
            <Item
              key={id}
              name={name}
              description={description}
              id={id}
              className="bg-white rounded-lg shadow-md p-4 mb-4"
              active={id === selectedItem}
            />
          ))}
        </ListGroup>
        <ItemMessage />
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Inventory;
