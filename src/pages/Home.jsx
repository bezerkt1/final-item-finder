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
    if (persistor.getState().itemsArray) {
      dispatch(getItems());
    }

    if (persistor.getState().favorites) {
      dispatch(getFavorites());
    }

    dispatch(getCategories());
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <TopAppBar>Recently Listed Items</TopAppBar>
      <div className="lg:flex lg:mx-10 lg:mt-5">
        <div className="lg:w-1/2 lg:h-screen">
          <ItemMap items={itemsArray} startLocation={[18.0686, 59.3293]} />
        </div>
        <div className="lg:w-1/2">
          <ListGroup className="w-full pb-20">
            {itemsArray?.map(({ name, description, id }) => (
              <Item
                key={id}
                name={name}
                description={description}
                id={id}
                className="bg-white rounded-lg shadow-md p-4 mb-4"
              />
            ))}
          </ListGroup>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Home;
