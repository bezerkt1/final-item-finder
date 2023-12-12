import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../reducers/itemSlice";
import { useNavigate } from "react-router-dom";
import { Select, Label, TextInput } from "flowbite-react";
import CustomButton from "../lib/CustomButton";
import LocationButton from "../lib/LocationButton";
import SelectLocationMap from "./SelectLocationMap";
import { DEFAULT_LOCATION } from "../config/config";

const AddItemForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // placeholder state to save input
  const [newItem, setNewItem] = useState({
    name: "", //string
    price: 0, //integer
    description: "", //string
    latitude: 0.0, //number
    longitude: 0.0, //number
    category_id: 0, //integer
  });

  const { longitude, latitude } = useSelector((state) => state.location);

  useEffect(() => {
    setNewItem((newItem) => ({
      ...newItem,
      longitude: longitude,
      latitude: latitude,
    }));
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
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  return (
    <form className="w-4/5 pb-20 md:w-2/4 md:pb-15 lg:w-full lg:flex-col" onSubmit={handleSubmit}>
      <div className="lg:flex lg:justify-center lg:mx-10 lg:gap-10">
        <div className="lg:w-full">
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
              onChange={(e) =>
                setNewItem({ ...newItem, price: parseInt(e.target.value) || 0 })
              }
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
              onChange={(e) =>
                setNewItem({ ...newItem, category_id: parseInt(e.target.value) })
              }
            >
              <option defaultValue="" hidden>
                ---Select---
              </option>
              <option value="1">Garden</option>
              <option value="2">Building</option>
              <option value="3">Electronics</option>
              <option value="4">Vehicles</option>
            </Select>
          </div>

          <div className="mb-4">
            <div className="mb-2 block">
              <Label value="Select pickup location" />
            </div>
            <SelectLocationMap
              startLocation={
                longitude && latitude ? [longitude, latitude] : DEFAULT_LOCATION
              }
              selectedLocation={(lng, lat) => {
                console.log("selected cords", lng, lat);
                setNewItem((currentNewItem) => ({
                  ...currentNewItem,
                  longitude: parseFloat(lng.toFixed(6)),
                  latitude: parseFloat(lat.toFixed(6)),
                }))
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
        </div>
      </div>

      <CustomButton
        id="submitItemBtn"
        type="submit"
        color="success"
        className="mx-auto my-4 bg-emerald-500"
        //onClick={handleClick}
      >
        Submit
      </CustomButton>
    </form>
  );
};

export default AddItemForm;
