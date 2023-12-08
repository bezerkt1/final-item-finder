import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const SelectLocationMap = ({items, startLocation, selectedLocation}) => {
  const mapContainer= useRef(null);
  const map = useRef(null);
  const locationMarkerRef = useRef(null);

  useEffect(() => {
    console.log("startlocation", startLocation)
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current, // Referencing the map container
        style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=WmV5NqhpUv7xCFrD85kS', // Style URL
        center: startLocation,
        zoom: 12
      });
    }

    if (locationMarkerRef.current) {
      locationMarkerRef.current.setLngLat(startLocation)
      map.current.setCenter(startLocation);
    } else {
      locationMarkerRef.current = new maplibregl.Marker({ draggable: true })
        .setLngLat(startLocation)
        .addTo(map.current);
    }
    
    locationMarkerRef.current.on('dragend', () => {
      const {lng, lat} = locationMarkerRef.current.getLngLat();
      console.log('Marker position:', lng, lat);
      selectedLocation(parseFloat(lng.toFixed(6)), parseFloat(lat.toFixed(6))); 
    
    });
  }, [startLocation]);  

  return (
    <div ref={mapContainer} style={{ height: '400px' }} />
  );
};

export default SelectLocationMap;