import { Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { appPages } from "../routes/AppRoutes";

const BottomNavbar = () => {
  return (
    <Navbar fluid className="fixed bottom-0 left-0 w-full list-none bg-emerald-500">
      {appPages.map(({ path, name, icon, index, menus }) =>
        menus.includes("navbar") && (
          <Navbar.Link as={NavLink} to={path} key={index} className="flex flex-col items-center">
            {icon}
            {name}
          </Navbar.Link>
        )
      )}
    </Navbar>
  );
};

export default BottomNavbar;
