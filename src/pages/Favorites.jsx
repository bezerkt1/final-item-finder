// list items with favorites = true
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getFavorites } from "../reducers/itemSlice";
import { ListGroup } from "flowbite-react";
import { persistor } from "../store";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import Item from "../lib/Item";

const Favorites = () => {
  const favorites = useSelector((state) => state.items.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    if (persistor.getState().favorites) {
      dispatch(getFavorites());
     }
  }, []);

  return (
    <>
      <TopAppBar>Favorites</TopAppBar>
      {/* List of favorited items */}
      <ListGroup className="w-screen rounded-none">
        {favorites?.map(
          ({ name, price, id, description, category_id, favorite }) => (
            <Item
              key={id}
              name={name}
              price={price}
              id={id}
              description={description}
              category_id={category_id}
              favorite={favorite}
            />
          )
        )}
      </ListGroup>
      <BottomNavbar />
    </>
  );
};

export default Favorites;
