import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const SelectLocationMap = ({ items, startLocation, selectedLocation }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const locationMarkerRef = useRef(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=WmV5NqhpUv7xCFrD85kS',
        center: startLocation,
        zoom: 12
      });
    }

    if (locationMarkerRef.current) {
      locationMarkerRef.current.setLngLat(startLocation);
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
    <div ref={mapContainer} className="h-96 rounded-md shadow-md border border-gray-300" />
  );
};

export default SelectLocationMap;
