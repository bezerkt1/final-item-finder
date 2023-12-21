import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../reducers/itemSlice";
import { List, Label, TextInput } from "flowbite-react";
import { NavLink } from "react-router-dom";
import Category from "../lib/Category";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import { BsTools, BsCarFrontFill, BsSearch } from "react-icons/bs";
import { PiTreeEvergreenFill, PiTelevisionBold } from "react-icons/pi";

const Search = () => {

  const categoryIcon = [
    { category_id: 1, name: "Garden", icon: <PiTreeEvergreenFill /> },
    { category_id: 2, name: "Building", icon: <BsTools /> },
    { category_id: 3, name: "Electronics", icon: <PiTelevisionBold /> },
    { category_id: 4, name: "Vehicles", icon: <BsCarFrontFill /> },
  ];
  
  return (
    <>
      <TopAppBar>Search</TopAppBar>
      {/*<form className="m-5">
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
      </form>*/}

      <h3 className="text-zinc-700 font-bold ml-5 mb-2">Categories</h3>
      <List className="w-full list-none bg-white">
        {categoryIcon?.map(({ name, icon, category_id }) => (
          <List.Item key={category_id} className="w-full">
            <NavLink to={`/category/${category_id}`}>
              <Category name={name} icon={icon} />
            </NavLink>
          </List.Item>
        ))}
      </List>
      <BottomNavbar />
    </>
  );
};

export default Search;

/* Originally fetched category names using redux, and it worked fine on local server
but for some users did not work on deployed site (it worked for others).
Therefore, category names and icons were hardcoded as a quick fix.


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
    name: categories?.find((x) => x.id === category.category_id).name,
  }));

  then map thru categoriesWithIcon
*/