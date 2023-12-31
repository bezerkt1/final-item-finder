import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../reducers/itemSlice";
import { useNavigate } from "react-router-dom";
import { Select, Label, TextInput, Button } from "flowbite-react";
import LocationButton from "../lib/LocationButton";
import SelectLocationMap from "./SelectLocationMap";
import { DEFAULT_LOCATION } from "../config/config";
import { setItemMessage, clearItemMessage } from "../reducers/itemSlice";
import { setSelectedItem } from "../reducers/itemSlice";

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

  const [formErrors, setFormErrors] = useState({});
  const { longitude, latitude } = useSelector((state) => state.location);

  useEffect(() => {
    setNewItem((newItem) => ({
      ...newItem,
      longitude: longitude || 0.0,
      latitude: latitude || 0.0,
    }));
  }, [longitude, latitude]);

  // save new item on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("dispatched", newItem);
    try {
      const result = await dispatch(createItem(newItem)).unwrap()
        console.log("the result", result)
        dispatch (setItemMessage(`Item ${result.name} listed`));
        dispatch (setSelectedItem(result.id))
        setTimeout(() => {
          dispatch(clearItemMessage());
        }, 10000);
        navigate("/inventory");
    } catch (error) {
      const responseErrors = JSON.parse(error.error)
      const responseFormErrors = responseErrors.detail.reduce( (acc, error) =>  ({
        ...acc,
        [error.loc[1]]: error.msg,
      }), {});
      setFormErrors(responseFormErrors);
      console.log("its an error", responseFormErrors)
      console.error("Error creating item:", error);
    }
  };

  return (
    <form
      className="w-4/5 pb-20 md:w-2/4 md:pb-15 lg:w-full lg:flex-col"
      onSubmit={handleSubmit}
    >
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
            {formErrors.name && (
              <span className="text-red-500">{formErrors.name}</span>
            )}
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
            {formErrors.price && (
              <span className="text-red-500">{formErrors.price}</span>
            )}
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
            {formErrors.description && (
              <span className="text-red-500">{formErrors.description}</span>
            )}
          </div>

          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="category" value="Select category" />
            </div>
            <Select
              id="category"
              required
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  category_id: parseInt(e.target.value),
                })
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
                }));
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
            {formErrors.longitude && (
              <span className="text-red-500">{formErrors.longitude}</span>
            )}
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
            {formErrors.latitude && (
              <span className="text-red-500">{formErrors.latitude}</span>
            )}
          </div>
        </div>
      </div>

      <Button
        id="submitItemBtn"
        type="submit"
        color="success"
        className="mx-auto my-4" //bg-emerald-700"
        //onClick={handleClick}
      >
        Submit
      </Button>
    </form>
  );
};

export default AddItemForm;
