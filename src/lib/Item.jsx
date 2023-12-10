import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFavorites, addFavorite, removeItem, removeFavorite } from "../reducers/itemSlice";
import { persistor } from "../store";
import { ListGroup } from "flowbite-react";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const Item = ({ name, price, description, category_id, id }) => {
  const login = useSelector((state) => state.login);
  const favorites = useSelector((state) => state.items.favorites);
  const dispatch = useDispatch();
  const [inFavorites, setInFavorites] = useState(false);

  useEffect(() => {
    if (persistor.getState().favorites) {
      dispatch(getFavorites());
    }

    const index = favorites.findIndex((item) => item.id === id);
    if (index !== -1) {
      setInFavorites(true);
    } else {
      setInFavorites(false);
    }
  }, [favorites]);

  const handleAddFavorite = () => {
    dispatch(
      addFavorite({
        name: name,
        price: price,
        id: id,
        description: description,
        category_id: category_id,
      })
    );
    setInFavorites(true);
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite({ id: id }));
    setInFavorites(false);
  };

  return (
    <ListGroup.Item as="div" className="relative text-gray-700 border-b border-gray-300 py-4 flex items-center">
      <div className="w-16 h-16 bg-cover bg-gray-300 rounded-full"></div>

      <div className="flex ml-5 flex-col">
        <p className="font-bold text-lg">{name}</p>
        <p className="font-normal">{description}</p>
      </div>

      <div className="absolute right-0 mr-5">
        {inFavorites ? (
          <MdFavorite className="text-red-500 cursor-pointer" onClick={handleRemoveFavorite} />
        ) : (
          <MdOutlineFavoriteBorder className="cursor-pointer" onClick={handleAddFavorite} />
        )}

        {login.isValid && (
          <FaTrash className="text-gray-500 mt-2 cursor-pointer" onClick={() => dispatch(removeItem({ id: id }))} />
        )}
      </div>
    </ListGroup.Item>
  );
};

export default Item;
