import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../reducers/locationSlice';
import { Button } from 'flowbite-react';


const LocationButton = () => {
  const dispatch = useDispatch();
  const { longitude, latitude } = useSelector(state => state.location);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(setLocation({
          longitude: position.coords.longitude.toFixed(6),
          latitude: position.coords.latitude.toFixed(6)
        }));
      }, (error) => {
        console.error('Error Code = ' + error.code + ' - ' + error.message);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
      <Button onClick={getLocation}>Get my location</Button>
  );
};
  
  export default LocationButton;