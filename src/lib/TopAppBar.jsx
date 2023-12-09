import { Navbar, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { appPages } from "../routes/AppRoutes";

const TopAppBar = ({ children }) => {
  const isValid = useSelector((state) => state.login.isValid);
  const navigate = useNavigate();

  const menuItems = appPages.filter(
    (item) =>
      item.menus.includes("topAppBar") && (item.loginRequired ? isValid : true)
  );
  // console.log("menuItems", menuItems);

  return (
    <div className="w-full">
      <Navbar fluid className="bg-zinc-300 lg:mx-10">
        <Button pill color="gray" className="bg-transparent border-transparent" onClick={() => navigate(-1)} >
          <IoIosArrowBack />
        </Button>

        <Navbar.Brand className="text-xl">{children}</Navbar.Brand>

        <Navbar.Toggle className="mr-5"/>

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
