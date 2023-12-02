// list of newly added items
// map through items and sort by newest
// copy html structure in CustomList.jsx

import { useSelector, useDispatch } from "react-redux";
import { addFavorite } from "../reducers/itemSlice";
import { ListGroup } from "flowbite-react";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import TopAppBar from "../lib/TopAppBar";
import Navbar from "../lib/BottomNavbar";

const Home = () => {
  const items = useSelector((store) => store.items);
  const dispatch = useDispatch();

  return (
    <>
      <TopAppBar>Recently listed items</TopAppBar>
      {/* List of recently added items, should be sorted by newest */}
      <ListGroup className="w-screen rounded-none">
        {items.map(({ title, desc, id, favorite }) => (
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
      <Navbar />
    </>
  );
};

export default Home;
