import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ItemDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  // useEffect(() => {
  //   const fetchItem = async () => {
  //     try {
  //       const response = await fetch(
  //         `${API_URL}/items/${itemId}`
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         setItem(data);
  //       } else {
  //         throw new Error("Failed to fetch item details");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching item details:", error);
  //     }
  //   };

  //   fetchItem();
  // }, [itemId]);

  return (
    <div className="container mx-auto p-4">
      {item ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
          <p className="mb-2">ID: {item.id}</p>
          {item.price === 0 ? (
            <p>Price: Free</p>
          ) : item.price ? (
            <p>Price: {item.price}</p>
          ) : null}
          <p className="mb-4">Description: {item.description}</p>
          {/* Display other details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ItemDetail;
