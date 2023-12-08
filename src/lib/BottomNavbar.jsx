import { Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { appPages } from "../routes/AppRoutes";

const BottomNavbar = () => {
  return (
    <Navbar
      fluid
      className="fixed bottom-0 w-full list-none bg-emerald-500"
    >
      {appPages
        .filter((page) => page.menus.includes("navbar"))
        .map(({ path, name, icon }, index) => (
          <Navbar.Link
            key={index}
            href={path}
            className="flex flex-col items-center"
          >
            {icon}
            {name}
          </Navbar.Link>
        ))}
    </Navbar>
  );
};

export default BottomNavbar;
