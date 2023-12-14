import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategories, getItems} from "../reducers/itemSlice";
import { persistor } from "../store";
import { ListGroup } from "flowbite-react";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import Item from "../lib/Item";
import ItemMap from "../components/ItemMap";
import { setSelectedItem } from "../reducers/itemSlice";

const CategorizedList = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const itemsArray = useSelector((state) => state.items.itemsArray);
  const selectedItem = useSelector((state) => state.items.selectedItem);
  const categories = useSelector((state) => state.items.categories);
  const [ categorizedItems, setCategorizedItems ] = useState([]);
  const [ mapLocation, setMapLocation] = useState([18.0686, 59.3293]);
  const [ header, setHeader ] = useState("");

  useEffect(() => {
    dispatch(getItems());
    dispatch(getCategories());
  },[]);

  useEffect(() => {
    setCategorizedItems(itemsArray.filter((item) => item.category_id === parseInt(categoryId)));

    if (selectedItem) {
      const {longitude, latitude} = itemsArray.find((item) => item.id === selectedItem)
      console.log("Selected", selectedItem, longitude, latitude)
      setMapLocation([longitude, latitude])
    }
  },[itemsArray]);

  useEffect(() => {
    const result = categories.filter((category) => category.id === parseInt(categoryId));
    setHeader(result[0].name);
  },[categories]);

  useEffect(() => {
    const lat = parseFloat(categorizedItems[0]?.longitude);
    const lon = parseFloat(categorizedItems[0]?.latitude);
    console.log("categorized", lat, lon)

    // if (lat === 0 || lon === 0) {
    //   setMapLocation([18.0686, 59.3293]);
    // }
    // console.log("categorized", lat, lon)
    // setMapLocation([lat, lon]);
  },[categorizedItems]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopAppBar>{header}</TopAppBar>
      <div className="lg:flex lg:mx-10 lg:mt-5">
        <div className="lg:w-1/2 lg:h-screen">
          <ItemMap items={categorizedItems} mapLocation={mapLocation} />
        </div>
        <div className="lg:w-1/2">
          <ListGroup className="w-full pb-20">
            {categorizedItems?.map(({ name, description, id, user_id  }) => (
              <Item
                key={id}
                name={name}
                description={description}
                id={id}
                user_id={user_id}
                className="bg-white rounded-lg shadow-md p-4 mb-4"
                onClick={(itemId) => {
                  dispatch(setSelectedItem(itemId))
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

export default CategorizedList;
