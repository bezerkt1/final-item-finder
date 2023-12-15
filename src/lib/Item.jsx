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
import { useLocation, useNavigate } from "react-router-dom";
import { ListGroup } from "flowbite-react";
import { MdOutlineFavoriteBorder, MdFavorite, MdMessage } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const Item = ({
  name,
  price,
  description,
  category_id,
  id,
  user_id,
  onClick,
}) => {
  const login = useSelector((state) => state.login);
  const favorites = useSelector((state) => state.items.favorites);
  const selectedItem = useSelector((state) => state.items.selectedItem);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
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
    navigate("/messages");
  };

  {/*
  NOTE! currently the api doesn’t return who is in a thread. So when you send a message there is no way of knowing who you sent it to. So there is still nothing to display in messages.
  However the person you sent it to will now see the message in their inbox
  */}


  const handleAddFavorite = () => {
    dispatch(favoriteItem(id));
    setInFavorites(true);
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(id));
    setInFavorites(false);
  };

  return (
    <ListGroup.Item
      as="div"
      className="relative text-gray-700 border-b border-gray-300 flex items-center"
      active={id === selectedItem}
      onClick={() => onClick && onClick(id)}
    >
      <div className="w-16 h-16 bg-cover bg-gray-300">
        <img
          src={`https://source.unsplash.com/random/200x200?sig=${id}`}
          alt={description}
        />
      </div>

      <div className="flex ml-5 flex-col text-left">
        <p className="font-bold text-lg">{name}</p>
        <p className="font-normal">{description}</p>
      </div>

      <div className="absolute right-0 mr-5">
        {location.pathname !== "/inventory" && login.isValid ? (
          inFavorites ? (
            <MdFavorite
              className="text-red-500 cursor-pointer"
              onClick={handleRemoveFavorite}
            />
          ) : (
            <MdOutlineFavoriteBorder
              className="cursor-pointer"
              onClick={handleAddFavorite}
            />
          )
        ) : null}

        {location.pathname !== "/inventory" && login.isValid ? (
          <MdMessage
            className="mt-2"
            onClick={() => handleSendMessage(user_id, name)}
          />
        ) : null}

        {location.pathname === "/inventory" && login.isValid ? (
          <FaTrash
            className="text-gray-500 mt-2 cursor-pointer"
            onClick={() => dispatch(deleteItem(id))}
          />
        ) : null}
      </div>
    </ListGroup.Item>
  );
};

export default Item;
