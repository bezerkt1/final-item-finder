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

  return (
    <div className="w-full">
      <Navbar fluid className="bg-gray-800 text-white lg:mx-10">
        <Button
          id="backBtn"
          aria-label="back button"
          pill
          color="gray"
          className="bg-transparent border-transparent"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack className="text-white" />
        </Button>

        <Navbar.Brand className="text-xl">{children}</Navbar.Brand>

        <Navbar.Toggle className="mr-5" />

        <Navbar.Collapse>
          {menuItems.map((item, index) => (
            <Navbar.Link
              key={index}
              href={item.path}
              className="align-center text-white"
            >
              {item.name}
            </Navbar.Link>
          ))}

          {isValid ? (
            <LogoutButton />
          ) : (
            <Navbar.Link href="/" className="text-white">
              Sign in
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default TopAppBar;
