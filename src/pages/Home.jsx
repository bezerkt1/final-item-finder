// list of newly added items
// map through items and sort by newest
// copy html structure in CustomList.jsx

import { useSelector } from "react-redux";
import { ListGroup } from "flowbite-react";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import ListItem from "../lib/ListItem";

const Home = () => {
  const items = useSelector((store) => store.items);

  return (
    <>
      <TopAppBar>Recently listed items</TopAppBar>
      {/* List of recently added items, should be sorted by newest */}
      <ListGroup className="w-screen rounded-none">
        {items.map(({ title, desc, id, favorite }) => (
          <ListItem key={id} title={title} desc={desc} id={id} favorite={favorite} />
        ))}
      </ListGroup>
      <BottomNavbar />
    </>
  );
};

export default Home;
