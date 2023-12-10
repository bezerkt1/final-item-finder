import { ListGroup, Label, TextInput } from "flowbite-react";
import Category from "../lib/Category";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import { BsTools } from "react-icons/bs";
import { PiTreeEvergreenFill } from "react-icons/pi";
import {
  MdSearch,
  MdOutlinePedalBike,
  MdSportsEsports,
  MdOutlineSportsSoccer,
} from "react-icons/md";

const Search = () => {
  // temp category array; may need to change to global state
  const categories = [
    {
      id: 1,
      name: "Household Tools",
      icon: <BsTools />,
    },
    {
      id: 2,
      name: "Gardening",
      icon: <PiTreeEvergreenFill />,
    },
    {
      id: 3,
      name: "Gaming",
      icon: <MdSportsEsports />,
    },
    {
      id: 4,
      name: "Transportation",
      icon: <MdOutlinePedalBike />,
    },
    {
      id: 5,
      name: "Sports & Leisure",
      icon: <MdOutlineSportsSoccer />,
    },
  ];

  return (
    <>
      <TopAppBar>Search</TopAppBar>
      {/* Search input field - onChange render list of relevant items */}
      <form className="flex flex-col m-5 gap-2">
        <Label
          htmlFor="inputSearch"
          value="What are you looking for?"
          className="text-zinc-500"
        ></Label>
        <div className="flex gap-4">
          <TextInput
            id="inputSearch"
            type="text"
            icon={MdSearch}
            placeholder="Search keyword or category"
            className="w-full"
          ></TextInput>
        </div>
      </form>

      {/* List of item categories - onClick render list of items in that category */}
      <h3 className="text-zinc-500 font-bold ml-5 mb-2">Categories</h3>
      <ListGroup className="w-screen rounded-none pb-20">
        {categories.map(({ name, icon, id }) => (
          <Category name={name} icon={icon} key={id} />
        ))}
      </ListGroup>
      <BottomNavbar />
    </>
  );
};

export default Search;
