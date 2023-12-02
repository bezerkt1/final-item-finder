// list items with favorites = true
import { useSelector, useDispatch } from "react-redux";
import { addFavorite } from "../reducers/itemSlice";
import { useState, useEffect } from "react";
import { ListGroup } from "flowbite-react";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";

const Favorites = () => {
  const [ faveItems, setFaveItems ] = useState();
  const items = useSelector((store) => store.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const filtered = items.filter((item) => item.favorite === true);
    setFaveItems(filtered);
  },[items])
  
  return (
    <>
      <TopAppBar>Favorites</TopAppBar>
      {/* List of favorited items */}
      <ListGroup className="w-screen rounded-none">
        {faveItems?.map(({ title, desc, id, favorite }) => (
          <ListGroup.Item as="div" className="text-zinc-500" key={id}>
            <div className="flex">
              <div className="w-16 h-16 bg-[url(https://picsum.photos/100/100)] bg-cover"></div>

              <div className="flex ml-5 flex-col justify-center">
                <p className="font-bold">{title}</p>
                <p className="font-normal">{desc}</p>
              </div>
            </div>

            <div className="fixed right-0 mr-5">
              {favorite ? (
                  <MdFavorite onClick={() => dispatch(addFavorite({id: id}))} />
              ) : (
                  <MdOutlineFavoriteBorder onClick={() => dispatch(addFavorite({id: id}))}/> 
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <BottomNavbar />
    </>
  );
};

export default Favorites;
