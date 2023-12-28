import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../reducers/itemSlice";
import { persistor } from "../store";
import { ListGroup } from "flowbite-react";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import Item from "../lib/Item";
import ItemMap from "../components/ItemMap";
import { setSelectedItem } from "../reducers/itemSlice";

const Home = () => {
  const dispatch = useDispatch();
  const itemsArray = useSelector((state) => state.items.itemsArray);
  const selectedItem = useSelector((state) => state.items.selectedItem);
  const userId = useSelector((state) => state.login.userId);
  const [notMyItems, setNotMyItems] = useState();
  const [mapLocation, setMapLocation] = useState([18.0686, 59.3293]);

  useEffect(() => {
    dispatch(getItems());

    if (persistor.getState().itemsArray) {
      dispatch(getItems());
    }
  }, []);

  useEffect(() => {
    setNotMyItems(itemsArray.filter((item) => item.user_id !== userId));
  }, [itemsArray, userId]);

  useEffect(() => {
    if (selectedItem && itemsArray && itemsArray.length > 0) {
      const selectedItemInfo = itemsArray.find((item) => item.id === selectedItem);
      if (selectedItemInfo) {
        const { longitude, latitude } = selectedItemInfo;
        setMapLocation([longitude, latitude]);
      }
    }
  }, [itemsArray, selectedItem]);

  //console.log("Items Array", itemsArray);

  return (
    <div className="flex flex-col min-h-screen">
      <TopAppBar>Recently Listed Items</TopAppBar>
      <div className="lg:flex lg:mx-10 lg:mt-5">
        <div className="lg:w-1/2 lg:h-screen">
          <ItemMap items={itemsArray} mapLocation={mapLocation} />
        </div>
        <div className="lg:w-1/2">
          <ListGroup className="w-full pb-20">
            {notMyItems?.map(({ name, description, id, user_id }) => (
              <Item
                key={id}
                name={name}
                description={description}
                id={id}
                user_id={user_id}
                className="bg-white rounded-lg shadow-md p-4 mb-4"
                onClick={(itemId) => {
                  dispatch(setSelectedItem(itemId));
                }}
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
