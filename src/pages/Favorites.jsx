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

  // Check that favorites state has been rehydrated before loading the list
  useEffect(() => {
    if (persistor.getState().favorites) {
      dispatch(getFavorites());
    }
  }, [favorites]);

  return (
    <div className="flex flex-col h-screen">
      <TopAppBar>Favorites</TopAppBar>
      <main className="flex-1 bg-gray-100 p-4 lg:p-8">
        <ListGroup className="w-full">
          {favorites?.map(({ name, price, id, description, category_id }) => (
            <Item
              key={id}
              name={name}
              price={price}
              id={id}
              description={description}
              category_id={category_id}
              className="bg-white rounded-lg shadow-md p-4 mb-4"
            />
          ))}
        </ListGroup>
      </main>
      <BottomNavbar />
    </div>
  );
};

export default Favorites;
