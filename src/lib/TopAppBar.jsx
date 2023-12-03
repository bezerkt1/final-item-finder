import { Navbar, Button } from "flowbite-react";
import LogoutButton from "./LogoutButton";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { appPages } from "../routes/AppRoutes";

const TopAppBar = ({ children }) => {
  const isValid = useSelector((state) => state.login.isValid);

  const menuItems = appPages.filter(
    (item) =>
      item.menus.includes("topAppBar") && (item.loginRequired ? isValid : true)
  );
  console.log("menuItems", menuItems);

  return (
    <div className="w-full">
      <Navbar fluid className="px-4 bg-zinc-300">
        <Button pill color="gray" className="bg-transparent border-transparent">
          <IoIosArrowBack />
        </Button>

        <Navbar.Brand className="text-xl">{children}</Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          {menuItems.map((item, index) => (
            <Navbar.Link key={index} href={item.path}>
              {item.name}
            </Navbar.Link>
          ))}

          {isValid ? (
            <LogoutButton />
          ) : (
            <Navbar.Link href="/">Sign in</Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default TopAppBar;
