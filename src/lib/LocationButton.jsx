import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../reducers/locationSlice";
import { Button } from "flowbite-react";

const LocationButton = () => {
  const dispatch = useDispatch();
  const { longitude, latitude } = useSelector((state) => state.location);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            setLocation({
              longitude: position.coords.longitude.toFixed(6),
              latitude: position.coords.latitude.toFixed(6),
            })
          );
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Button
      id="myLocationBtn"
      onClick={getLocation}
      className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-300 ease-in-out"
    >
      Get my location
    </Button>
  );
};

export default LocationButton;
