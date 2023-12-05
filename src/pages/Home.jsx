// list of newly added items
// map through items and sort by newest
// copy html structure in CustomList.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems, getCategories, getFavorites } from "../reducers/itemSlice";
import { ListGroup } from "flowbite-react";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import Item from "../lib/Item";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
    dispatch(getCategories());
    dispatch(getFavorites());
  }, []);

  const itemsArray = useSelector((state) => state.items.itemsArray);

  return (
    <>
      <TopAppBar>Recently listed items</TopAppBar>
      {/* List of recently added items, should be sorted by newest */}
      <ListGroup className="w-screen rounded-none">
        {itemsArray?.map(({ name, description, id, favorite }) => (
          <Item
            key={id}
            name={name}
            description={description}
            id={id}
            favorite={favorite}
          />
        ))}
      </ListGroup>
      <BottomNavbar />
    </>
  );
};

export default Home;
