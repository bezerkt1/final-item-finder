import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { createItem } from "../reducers/itemSlice";
import { useNavigate } from "react-router-dom";
import { Select, Label, TextInput, Button } from "flowbite-react";
import CustomButton from "../lib/CustomButton";
import LocationButton from "../lib/LocationButton";
import SelectLocationMap from "./SelectLocationMap";
import { DEFAULT_LOCATION } from '../config/config';


const AddItemForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // placeholder state to save input
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    description: "",
    user_id: 0,
    latitude: 0.0,
    longitude: 0.0,
    category_id: 0
  });

  const { longitude, latitude } = useSelector(state => state.location);

  useEffect(() => {
    setNewItem(newItem => ({ ...newItem, longitude: longitude, latitude: latitude }));

  }, [longitude, latitude]);

  // save date created on click the database will save the date an item is created
  //const handleClick = () => {
    //let dateCreated = new Date().toLocaleDateString("sv-SE");
    //setNewItem({ ...newItem, created: dateCreated });
    //console.log("clicked");
  //};

  // save new item on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("dispatched", newItem);
    dispatch(createItem(newItem));
    setTimeout(() => {navigate('/home')}, 2000);
  };

  return (
    <form className="w-4/5 md:w-2/4 lg:w-1/4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name of item" />
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="ex: grass trimmer"
          required
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="price" value="Price in kr" />
        </div>
        <TextInput
          id="price"
          type="text"
          placeholder="ex: 100"
          required
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <TextInput
          id="description"
          type="text"
          placeholder="Ryobi grass trimmer 18V"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="category" value="Select category" />
        </div>
        <Select
          id="category"
          required
          onChange={(e) => setNewItem({ ...newItem, category_id: e.target.value })}
        >
          <option defaultValue="" hidden>
            ---Select---
          </option>
          <option value="1">Household tools</option>
          <option value="2">Gardening</option>
          <option value="3">Gaming</option>
          <option value="4">Transportation</option>
          <option value="5">Sports & Leisure</option>
        </Select>
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label value="Select pickup location" />
        </div>
        <SelectLocationMap
          startLocation={longitude && latitude ? [longitude, latitude] : DEFAULT_LOCATION}
          selectedLocation={(lng, lat) => {
            console.log("selected cords", lng, lat)
            setNewItem({ ...newItem, longitude: lng, latitude: lat })
          }}
        />
      </div>

      <div className="mb-4">
        <LocationButton />
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="longitude" value="Longitude" />
        </div>
        <TextInput
          id="longitude"
          type="text"
          value={newItem.longitude}
          readOnly
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="latitude" value="Latitude" />
        </div>
        <TextInput
          id="latitude"
          type="text"
          value={newItem.latitude}
          readOnly
        />
      </div>

      {/* 
      upload image
      */}

      <CustomButton
        type="submit"
        color="success"
        className="mx-auto mb-4 bg-emerald-500"
        //onClick={handleClick}
      >
        Submit
      </CustomButton>
    </form>
  );
};

export default AddItemForm;

// new item details saving to local state but
// need to check if posting to api
