// list of newly added items
// map through items and sort by newest
// copy html structure in CustomList.jsx

import { useSelector } from "react-redux";
import { ListGroup } from "flowbite-react";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import Item from "../lib/Item";
import ItemMap from "../components/ItemMap";

const Home = () => {
  const items = useSelector((store) => store.items);

  return (
    <>
      <TopAppBar>Recently listed items</TopAppBar>
      {/* List of recently added items, should be sorted by newest */}
      <ItemMap items={items} />
      <ListGroup className="w-screen rounded-none">
        {items.map(({ title, desc, id, favorite }) => (
          <Item key={id} title={title} desc={desc} id={id} favorite={favorite} />
        ))}
      </ListGroup>
      <BottomNavbar />
    </>
  );
};

export default Home;
