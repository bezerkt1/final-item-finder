import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getFavorites,
  favoriteItem,
  removeFavorite,
  deleteItem,
} from "../reducers/itemSlice";
import { sendMessage } from "../reducers/messageSlice";
import { persistor } from "../store";
import { ListGroup } from "flowbite-react";
import { MdOutlineFavoriteBorder, MdFavorite, MdMessage } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const Item = ({ name, price, description, category_id, id, user_id }) => {
  const login = useSelector((state) => state.login);
  const favorites = useSelector((state) => state.items.favorites);
  const dispatch = useDispatch();
  const [inFavorites, setInFavorites] = useState(false);

  useEffect(() => {
    if (persistor.getState().favorites) {
      dispatch(getFavorites());
    }
    // find items that are in favorites array and set state to true/false
    const index = favorites.findIndex((item) => item.id === id);
    if (index !== -1) {
      setInFavorites(true);
    } else {
      setInFavorites(false);
    }
  }, [favorites]);

  const handleSendMessage = (userId, itemName) => {
    const message = `Hi! I would like to borrow ${itemName}`; // Define your preset message
    dispatch(sendMessage({ userId, message: message }));
  };

  const handleAddFavorite = () => {
    dispatch(favoriteItem(id));
    setInFavorites(true);
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(id));
    setInFavorites(false);
  };

  return (
    <ListGroup.Item as="div" className="relative text-gray-700 border-b border-gray-300 flex items-center">
      <div className="w-16 h-16 bg-cover bg-gray-300 rounded-full"></div>

      <div className="flex ml-5 flex-col text-left">
        <p className="font-bold text-lg">{name}</p>
        <p className="font-normal">{description}</p>
      </div>

      <div className="absolute right-0 mr-5">
        {inFavorites ? (
          <MdFavorite className="text-red-500 cursor-pointer" onClick={handleRemoveFavorite} />
        ) : (
          <MdOutlineFavoriteBorder className="cursor-pointer" onClick={handleAddFavorite} />
        )}

        <MdMessage
          className="mt-2"
          onClick={() => handleSendMessage(user_id, name)}
        />

        {login.isValid && (
          <FaTrash className="text-gray-500 mt-2 cursor-pointer" onClick={() => dispatch(deleteItem(id))} />
        )}
      </div>
    </ListGroup.Item>
  );
};

export default Item;
