// list items with favorites = true
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ListGroup } from "flowbite-react";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import Item from "../lib/Item";

const Favorites = () => {
  const [ faveItems, setFaveItems ] = useState();
  const items = useSelector((store) => store.items);

  // useEffect(() => {
  //   const filtered = items.filter((item) => item.favorite === true);
  //   setFaveItems(filtered);
  // },[items])
  
  return (
    <>
      <TopAppBar>Favorites</TopAppBar>
      {/* List of favorited items
      <ListGroup className="w-screen rounded-none">
        {faveItems?.map(({ title, desc, id, favorite }) => (
          <Item key={id} title={title} desc={desc} id={id} favorite={favorite} />
        ))}
      </ListGroup> */}
      <BottomNavbar /> 
    </>
  );
};

export default Favorites;
