import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ItemDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `http://basternet.ddns.net:8777/items/${itemId}`
        );
        if (response.ok) {
          const data = await response.json();
          setItem(data);
        } else {
          throw new Error("Failed to fetch item details");
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItem();
  }, [itemId]);

  return (
    <div>
      {item ? (
        <div>
          <h2>{item.name}</h2>
          <p>ID: {item.id}</p>
          {item.price === 0 ? (
            <p>Price: Free</p>
          ) : item.price ? (
            <p>Price: {item.price}</p>
          ) : null}
          <p>Description: {item.description}</p>
          {/* Display other details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ItemDetail;
