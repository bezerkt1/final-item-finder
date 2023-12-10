// map thru items array, sorted by newest
// use in Home.jsx and Favorites.jsx
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFavorites, favoriteItem, removeFavorite, deleteItem } from "../reducers/itemSlice";
import { sendMessage } from "../reducers/messageSlice";
import { persistor } from "../store";
import { ListGroup } from "flowbite-react";
import { MdOutlineFavoriteBorder, MdFavorite, MdMessage } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const Item = ({ name, price, description, category_id, id, user_id }) => {
  const login = useSelector((state) => state.login);
  const favorites = useSelector((state) => state.items.favorites);
  const dispatch = useDispatch();
  const [ inFavorites, setInFavorites ] = useState(false);

  // check that favorites state has been rehydrated before loading list
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
    dispatch(removeFavorite({ id }));
    setInFavorites(false);
  };

  return (
    <ListGroup.Item as="div" className="relative text-zinc-500">
      <div className="flex">
        <div className="w-16 h-16 bg-[url(https://picsum.photos/100/100)] bg-cover"></div>

        <div className="flex ml-5 flex-col justify-center text-left">
          <p className="font-bold">{name}</p>
          <p className="font-normal">{description}</p>
        </div>
      </div>

      <div className="absolute right-0 mr-5">
        {inFavorites ? (
          <MdFavorite onClick={handleRemoveFavorite} />
        ) : (
          <MdOutlineFavoriteBorder onClick={handleAddFavorite} />
        )}

        <MdMessage className="mt-2" onClick={() => handleSendMessage(user_id, name)} />

        {/*  possible to make this icon show only for items listed by user?? */}
        {login.isValid && (
          <FaTrash className="mt-2" onClick={() => dispatch(deleteItem(id)) } />
        )}
      </div>
    </ListGroup.Item>
  );
};

export default Item;
