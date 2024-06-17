import { Link, useLocation } from "react-router-dom";
import { Button, Navbar, TextInput, Avatar, Dropdown } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux-slice/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";

function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const currentUserDetails = useSelector((state) => state.user.currentUser);
  console.log("Header: ", currentUserDetails);
  const { theme } = useSelector((state) => state.theme);
  return (
    <Navbar className="fixed w-full z-10 shadow-lg flex items-center justify-between gap-1">
      <Link to="/" className="flex items-center gap-1">
        <img
          src="/logo.png"
          className="mr-0 h-6 lg:h-9 rounded-full"
          alt="Shibaji logo"
        />
        <p className="self-center whitespace-nowrap text-xs lg:text-sm font-semibold font-[Inter] dark:text-white ml-0 py-1">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white">
            Shibaji
          </span>
          Sangha
        </p>
      </Link>

      <form>
        <TextInput
          id="email1"
          type="text"
          placeholder="Search ..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          required
        />
      </form>

      <Button
        className="w-8 h-8 flex justify-center items-center lg:hidden"
        color="gray"
        pill
      >
        <AiOutlineSearch />
      </Button>

      <div className="flex items-center gap-3 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline border-none focus:outline-none focus:ring-0"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUserDetails ? (
          <Dropdown
            label={
              <Avatar
                rounded
                className="text-success font-[Inter] text-sm"
                size="sm"
                alt="user"
                img={currentUserDetails.profilePicture}
              />
            }
            arrowIcon={true}
            inline
          >
            <Dropdown.Header>
              <span className="block text-xs font-medium font-[Inter">
                {currentUserDetails.username}
              </span>
              <span className="block truncate text-xs font-[Inter] trancate">
                {currentUserDetails.email}
              </span>
            </Dropdown.Header>
            {currentUserDetails.isAdmin && (
              <Link to="/admin-dashboard">
                <Dropdown.Item className="text-[14px] font-[Inter]">
                  Dashboard
                </Dropdown.Item>
              </Link>
            )}
            <Link to="/admin-dashboard?tab=profile">
              <Dropdown.Item className="text-[14px] font-[Inter]">
                Profile
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item className="text-[14px] text-[blue] font-semibold font-[Inter]">
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button
              outline
              gradientDuoTone="purpleToPink"
              size="xs"
              className="font-[Inter]"
            >
              Sign in
            </Button>
          </Link>
        )}

        <Navbar.Toggle
          className="w-10 h-8 flex justify-center items-center focus:ring-0 focus:outline-none"
          color="gray"
        />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/" className="text-xs lg:text-sm font-semibold">
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link
            to="/about"
            className="text-xs lg:text-sm font-[Inter] font-semibold"
          >
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/practices"} as={"div"}>
          <Link
            to="/practices"
            className="text-xs lg:text-sm font-[Inter] font-semibold"
          >
            Practices
          </Link>
        </Navbar.Link>
        {/* <Navbar.Link active={path === "/contact-us"} as={"div"}>
          <Link
            to="/contact-us"
            className="text-xs lg:text-sm font-[Inter] font-semibold"
          >
            Contact
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/blogs"} as={"div"}>
          <Link
            to="/blogs"
            className="text-xs lg:text-sm font-[Inter] font-semibold"
          >
            Blogs
          </Link>
        </Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
