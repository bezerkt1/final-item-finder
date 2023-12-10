// list of newly added items
// map through items and sort by newest
// copy html structure in CustomList.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems, getCategories, getFavorites } from "../reducers/itemSlice";
import { persistor } from "../store";
import { ListGroup } from "flowbite-react";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import Item from "../lib/Item";
import ItemMap from "../components/ItemMap";

const Home = () => {
  const dispatch = useDispatch();
  const itemsArray = useSelector((state) => state.items.itemsArray);

  useEffect(() => {
    dispatch(getItems());
    if (persistor.getState().itemsArray) {
      dispatch(getItems());
    }

    if (persistor.getState().favorites) {
      dispatch(getFavorites());
    }

    dispatch(getCategories());
  }, []);

  return (
    <>
      <TopAppBar>Recently listed items</TopAppBar>
      {/* List of recently added items, should be sorted by newest */}
      <ItemMap items={itemsArray} startLocation={[18.0686, 59.3293]} />
      <ListGroup className="w-screen rounded-none pb-20">
        {itemsArray?.map(({ name, description, id, user_id }) => (
          <Item key={id} name={name} description={description} id={id} user_id={user_id} />
        ))}
      </ListGroup>
      <BottomNavbar />
    </>
  );
};

export default Home;
