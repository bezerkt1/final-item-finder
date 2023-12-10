import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const ItemMap = ({ items, startLocation }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=WmV5NqhpUv7xCFrD85kS',
        center: startLocation || [18.0686, 59.3293],
        zoom: 12
      });
    }

    if (items && items.length > 0) {
      items.forEach(item => {
        const { longitude, latitude } = item;
        new maplibregl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map.current);
      });
    }

    // Update map size on window resize
    window.addEventListener('resize', () => {
      if (map.current) {
        map.current.resize();
      }
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [items, startLocation]);

  return (
    <div ref={mapContainer} className="h-96 lg:h-screen w-full" />
  );
};

export default ItemMap;
