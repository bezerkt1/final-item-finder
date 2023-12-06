import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../reducers/locationSlice';
import { Button } from 'flowbite-react';


const LocationButton = () => {
  const dispatch = useDispatch();
  const { longitude, latitude } = useSelector(state => state.location);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("longcord ", position.coords.longitude)
        dispatch(setLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        }));
      }, (error) => {
        console.error('Error Code = ' + error.code + ' - ' + error.message);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
      <Button onClick={getLocation}>Get Location</Button>
  );
};
  
  export default LocationButton;