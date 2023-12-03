// map thru items array, sorted by newest
// use in Home.jsx and Favorites.jsx

import { addFavorite } from "../reducers/itemSlice";
import { ListGroup } from "flowbite-react";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";

const ListItem = ({ title, desc, id, favorite }) => {
  return (
    <ListGroup.Item as="div" className="text-zinc-500">
      <div className="flex">
        <div className="w-16 h-16 bg-[url(https://picsum.photos/100/100)] bg-cover"></div>
      
        <div className="flex ml-5 flex-col justify-center">
          <p className="font-bold">{title}</p>
          <p className="font-normal">{desc}</p>
        </div>
      </div>

      <div className="fixed right-0 mr-5">
        {favorite ? (
          <MdFavorite onClick={() => dispatch(addFavorite({ id: id }))} />
        ) : (
          <MdOutlineFavoriteBorder
            onClick={() => dispatch(addFavorite({ id: id }))}
          />
        )}
      </div>
    </ListGroup.Item>
  );
};

export default ListItem;
