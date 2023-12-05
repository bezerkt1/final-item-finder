import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const ItemMap = ({items}) => {
  const mapContainer= useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current, // Referencing the map container
        style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=WmV5NqhpUv7xCFrD85kS', // Style URL
        center: [18.0686, 59.3293], // Starting position [lng, lat]
        zoom: 12
      });
    }

    // Add markers for each item
    items.forEach(item => {
      console.log("item", item)

      new maplibregl.Marker()
        .setLngLat(item.location) // Set location from item
        .addTo(map.current);

    });
  }, [items]);  

  return (
    <div ref={mapContainer} style={{ height: '400px' }} />
  );
};

export default ItemMap;