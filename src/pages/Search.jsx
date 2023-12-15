import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../reducers/itemSlice";
import { ListGroup, Label, TextInput } from "flowbite-react";
import { NavLink } from "react-router-dom";
import Category from "../lib/Category";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import { BsTools, BsCarFrontFill, BsSearch } from "react-icons/bs";
import { PiTreeEvergreenFill, PiTelevisionBold } from "react-icons/pi";

const Search = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.items.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categoryIcon = [
    { category_id: 1, icon: <PiTreeEvergreenFill /> },
    { category_id: 2, icon: <BsTools /> },
    { category_id: 3, icon: <PiTelevisionBold /> },
    { category_id: 4, icon: <BsCarFrontFill /> },
  ];

  const categoriesWithIcon = categoryIcon.map((category) => ({
    ...category,
    name: categories.find((x) => x.id === category.category_id).name,
  }));

  return (
    <>
      <TopAppBar>Search</TopAppBar>
      <form className="m-5">
        <Label
          htmlFor="inputSearch"
          value="What are you looking for?"
          className="text-zinc-700 block mb-2"
        ></Label>
        <div className="flex gap-4">
          <TextInput
            id="inputSearch"
            type="text"
            icon={BsSearch}
            placeholder="Search keyword or category"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          ></TextInput>
        </div>
      </form>

      <h3 className="text-zinc-700 font-bold ml-5 mb-2">Categories</h3>
      <ListGroup className="w-full">
        {categoriesWithIcon?.map(({ name, icon, category_id }) => (
          <NavLink to={`/category/${category_id}`} key={category_id}>
            <Category name={name} icon={icon} />
          </NavLink>
        ))}
      </ListGroup>
      <BottomNavbar />
    </>
  );
};

export default Search;
