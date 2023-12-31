import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategories, getItems } from "../reducers/itemSlice";
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
  //const categories = useSelector((state) => state.items.categories);
  const [categorizedItems, setCategorizedItems] = useState([]);
  const [mapLocation, setMapLocation] = useState([18.0686, 59.3293]);
  const [header, setHeader] = useState("");

  const categories = [
    { category_id: 1, name: "Garden" },
    { category_id: 2, name: "Building" },
    { category_id: 3, name: "Electronics" },
    { category_id: 4, name: "Vehicles" },
  ];

  useEffect(() => {
    dispatch(getItems());
    //dispatch(getCategories());
  }, []);

  // filter itemsArray by category
  useEffect(() => {
    setCategorizedItems(
      itemsArray.filter((item) => item.category_id === parseInt(categoryId))
    );

    // set selected item on initial render to be the first item's location on list
    if (categorizedItems) {
      dispatch(setSelectedItem(categorizedItems[0]?.id));
    }
  }, [itemsArray]);

  // retrieve category name for header
  useEffect(() => {
    const result = categories.filter(
      (category) => category.category_id === parseInt(categoryId)
    );
    setHeader(result[0].name);
  }, [categories]);

  // change selected item when click on another item
  const handleClick = (id) => {
    dispatch(setSelectedItem(id));
  };

  //set location on map to selected item
  useEffect(() => {
    const mapLocation = itemsArray?.find((item) => item.id === selectedItem);

    if (mapLocation) {
      setMapLocation([mapLocation?.longitude, mapLocation?.latitude]);
    }
  }, [selectedItem]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopAppBar>{header}</TopAppBar>
      <div className="lg:flex lg:mx-10 lg:mt-5">
        <div className="lg:w-1/2 lg:h-screen">
          <ItemMap items={categorizedItems} mapLocation={mapLocation} />
        </div>
        <div className="lg:w-1/2">
          <ListGroup className="w-full pb-20">
            {categorizedItems?.map(({ name, description, id, user_id }) => (
              <Item
                key={id}
                name={name}
                description={description}
                id={id}
                user_id={user_id}
                className="bg-white rounded-lg shadow-md p-4 mb-4"
                onClick={handleClick}
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

/* encountered error on deployed site fetching categories but no error on local server
as a quick fix, hardcoded the categories to avoid fetch
*/