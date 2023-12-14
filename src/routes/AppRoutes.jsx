import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginRequired from "../lib/LoginRequired";
import Login from "../pages/Login";
import Home from "../pages/Home";
import About from "../pages/About";
import Search from "../pages/Search";
import Messages from "../pages/Messages";
import Favorites from "../pages/Favorites";
import AddItem from "../pages/AddItem";
import ItemDetail from "../pages/ItemDetails.jsx"
import Inventory from "../pages/Inventory";
import NotFound from "../pages/NotFound";
import { MdHome, MdSearch, MdFavorite, MdAddBox, MdMessage } from "react-icons/md";

export const appPages = [
  {
    name: "Login",
    component: Login,
    menus: [],
    path: "/",
    icon: null,
  },
  {
    name: "Home",
    component: Home,
    menus: ["topAppBar", "navbar"],
    path: "/home",
    icon: <MdHome />,
  },
  {
    name: "About",
    component: About,
    menus: ["topAppBar"],
    path: "/about",
    icon: null,
  },
  {
    name: "Search",
    component: Search,
    menus: ["navbar"],
    path: "/search",
    icon: <MdSearch />,
  },
  {
    name: "Favorites",
    component: Favorites,
    menus: ["navbar"],
    path: "/favorites",
    icon: <MdFavorite />,
    loginRequired: true,
  },
  {
    name: "Add Item",
    component: AddItem,
    menus: ["topAppBar"],
    path: "/additem",
    icon: <MdAddBox />,
    loginRequired: true,
  },
  {
    name: "Inventory",
    component: Inventory,
    menus: ["topAppBar"],
    path: "/inventory",
    icon: null,
    loginRequired: true,
  },
  {
    name: "Messages",
    component: Messages,
    menus: ["navbar"],
    path: "/messages",
    icon: <MdMessage />,
    loginRequired: true,
  },
  {
    name: "Item Detail",
    component: ItemDetail,
    menus: [],
    path: "/item/:itemId",
    icon: "",
    loginRequired: false,
  },
  {
    name: "Not Found",
    component: NotFound,
    menus: [],
    path: "*",
    icon: null,
  },
];

const AppRoutes = () => {
  const login = useSelector((state) => state.login);

  return (
    <Routes>
      {appPages.map((page, index) => {
        if (page.name === "Login" && login.isValid) {
          return (
            <Route
              key={index}
              path={page.path}
              element={<Navigate to="/home" />}
            />
          );
        }

        return (
          <Route
            key={index}
            path={page.path}
            element={
              page?.loginRequired ? (
                <LoginRequired>
                  <page.component />
                </LoginRequired>
              ) : (
                <page.component />
              )
            }
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
