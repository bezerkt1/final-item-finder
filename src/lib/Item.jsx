// map thru items array, sorted by newest
// use in Home.jsx and Favorites.jsx
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFavorites, addFavorite, removeFavorite, favoriteItem, deleteItem } from "../reducers/itemSlice";
import { persistor } from "../store";
import { ListGroup } from "flowbite-react";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const Item = ({ name, price, description, category_id, id, latitude, longitude, favorite, user_id }) => {
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

  const handleAddFavorite = () => {
    //dispatch(favoriteItem({ id: id }));
    dispatch(favoriteItem({
      name: name,
      price: price,
      id: id,
      description: description,
      latitude: latitude,
      longitude: longitude,
      favorite: favorite,
      user_id: user_id,
      category_id: category_id
    }))
    setInFavorites(true);
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite({ id: id }));
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

        {/*  possible to make this icon show only for items listed by user?? */}
        {login.isValid && (
          <FaTrash className="mt-2" onClick={() => dispatch(deleteItem(id)) } />
        )}
      </div>
    </ListGroup.Item>
  );
};

export default Item;
