import { Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { appPages } from "../routes/AppRoutes";

const BottomNavbar = () => {
  return (
    <Navbar
      fluid
      className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300"
    >
      <ul className="flex w-full justify-around">
        {appPages
          .filter((page) => page.menus.includes("navbar"))
          .map(({ path, name, icon }, index) => (
            <Navbar.Link
              key={index}
              as={NavLink}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-gray-900 border-indigo-500"
                  : "flex flex-col items-center justify-center text-sm text-gray-600 py-3 focus:outline-none focus:text-gray-900 focus:border-indigo-500"
              }
            >
              {icon}
              <span className="mt-1">{name}</span>
            </Navbar.Link>
          ))}
      </ul>
    </Navbar>
  );
};

export default BottomNavbar;
