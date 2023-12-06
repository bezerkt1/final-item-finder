// map thru items array, sorted by newest
// use in Home.jsx and Favorites.jsx
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeItem, removeFavorite } from "../reducers/itemSlice";
import { ListGroup } from "flowbite-react";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const Item = ({ name, price, description, category_id, id, favorite }) => {
  const login = useSelector((state) => state.login);
  const favorites = useSelector((state) => state.items.favorites);

  const [ inFavorites, setInFavorites ] = useState(false);

  useEffect(() => {
    const index = favorites.indexOf({id});
    if (index !== -1) {
      setInFavorites(true);
    } else {
      setInFavorites(false);
    }
  },[]);

  const handleAddFavorite = () => {
    dispatch(
      addFavorite({
        name: {name},
        price: {price},
        description: {description},
        category_id: {category_id},
        favorite: true,
        //created: newItem.created,
      })
    );
    setInFavorites(true);
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite({ id: id }));
    setInFavorites(false);
  };

  const dispatch = useDispatch();
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
          <FaTrash className="mt-2" onClick={() => dispatch(removeItem({ id: id }))} />
        )}
      </div>
    </ListGroup.Item>
  );
};

export default Item;
