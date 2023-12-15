import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { setSelectedItem } from "../reducers/itemSlice";
import { useDispatch } from "react-redux";

const ItemMap = ({ items, mapLocation }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!map.current) {
      //console.log("new map");
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style:
          "https://api.maptiler.com/maps/basic-v2/style.json?key=WmV5NqhpUv7xCFrD85kS",
        center: mapLocation || [18.0686, 59.3293],
        zoom: 12,
      });
    }

    if (mapLocation && map.current) {
      map.current.flyTo({ center: mapLocation, zoom: 12 });
    }

    if (items && items.length > 0) {
      items.forEach((item) => {
        const { longitude, latitude } = item;

        const popupHTML = `
          <div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
        `;

        const popup = new maplibregl.Popup({
          offset: 25,
          closeButton: false,
        }).setHTML(popupHTML);

        const marker = new maplibregl.Marker()
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(map.current);

        marker.getElement().addEventListener("click", () => {
          console.log(item);
          dispatch(setSelectedItem(item.id));
        });
      });
    }

    // Update map size on window resize
    window.addEventListener("resize", () => {
      if (map.current) {
        map.current.resize();
      }
    });
  }, [items, mapLocation]);

  useEffect(() => {
    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return <div ref={mapContainer} className="h-96 lg:h-screen w-full" />;
};

export default ItemMap;
