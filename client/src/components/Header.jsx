import { Link, useLocation } from "react-router-dom";
import { Button, Navbar, TextInput } from "flowbite-react";

import Cookies from "js-cookie";

import { AiOutlineSearch } from "react-icons/ai";

function Header() {
  const token = Cookies.get("jwt_token");

  const path = useLocation().pathname;
  return (
    <Navbar className="fixed w-full z-10 shadow-lg flex items-center justify-between gap-1">
      <Link to="/" className="flex items-center gap-1">
        <img
          src="/logo.png"
          className="mr-0 h-6 lg:h-9 rounded-full"
          alt="Shibaji logo"
        />
        <p className="self-center whitespace-nowrap text-xs lg:text-sm font-semibold font-sans dark:text-white ml-0 py-1">
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
        {token ? (
          <Button
            outline
            gradientDuoTone="purpleToPink"
            size="xs"
            className="font-[Inter]"
            // onClick={onClickLogout}
          >
            Logout
          </Button>
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
          className="w-10 h-8 flex justify-center items-center"
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
          <Link to="/about" className="text-xs lg:text-sm font-semibold">
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/practices"} as={"div"}>
          <Link to="/practices" className="text-xs lg:text-sm font-semibold">
            Practices
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/contact-us"} as={"div"}>
          <Link to="/contact-us" className="text-xs lg:text-sm font-semibold">
            Contact
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/blogs"} as={"div"}>
          <Link to="/blogs" className="text-xs lg:text-sm font-semibold">
            Blogs
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
