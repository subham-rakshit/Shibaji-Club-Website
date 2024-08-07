import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Navbar,
  TextInput,
  Avatar,
  Dropdown,
  Popover,
} from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux-slice/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";
import { signOutSuccess } from "../redux-slice/userSlice";
import Cookies from "js-cookie";

// Define the sleep function
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [isSearchFromSearchBox, setIsSearchFromSearchBox] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const path = useLocation().pathname;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const checkTokenStatus = async () => {
      try {
        const res = await fetch("/api/auth/check-token");
        const data = await res.json();

        if (!res.ok && data.status === false) {
          if (currentUser) {
            dispatch(signOutSuccess());
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      checkTokenStatus();
    }
  }, [location]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchItemFromURL = urlParams.get("searchItem");

    if (searchItemFromURL) {
      setSearchInput(searchItemFromURL);
    }
  }, [location.search]);

  const handlePageChange = async (e, href) => {
    e.preventDefault();
    const body = document.querySelector("body");
    body.classList.add("page-transition");

    await sleep(200);
    navigate(href);
    await sleep(200);
    body.classList.remove("page-transition");
  };

  const handleSignOut = async () => {
    try {
      const api = "/api/user/signout";
      const options = {
        method: "POST",
      };
      const res = await fetch(api, options);
      const data = await res.json();

      if (res.ok) {
        dispatch(signOutSuccess());
        Cookies.remove("jwt_token");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //* Method - 1 (Preferable)
  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    const tabURL = urlParams.get("tab");

    urlParams.set("searchItem", searchInput);

    if (!tabURL) {
      urlParams.set("tab", "all");
    }

    navigate(`/search?${urlParams.toString()}`);
    setSearchInput("");
    setIsSearchFromSearchBox(false);
  };

  //* Method - 2
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   navigate(`/search?tab=all&searchItem=${encodeURIComponent(searchInput)}`);
  //   setSearchInput("");
  // };

  const content = (
    <form onSubmit={handleSearch} className="flex items-center lg:hidden pl-2">
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 px-4 py-1 border-none outline-none rounded-l-lg text-xs font-[Inter] bg-transparent focus:border-none focus:outline-none"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        required
        autoComplete="false"
      />
      <button
        className="px-4 py-2 rounded-r-lg border-none outline-none"
        type="submit"
      >
        <AiOutlineSearch />
      </button>
    </form>
  );

  return (
    <Navbar
      className={`fixed top-0 left-0 z-[100] w-full h-[60px] sm:h-[70px] shadow-lg ${
        location.pathname === "/reset-password" ? "hidden" : ""
      }`}
    >
      {/* Website Logo */}
      <Link to="/">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/bgRemoveWebLogo.png?alt=media&token=4d742d92-7d25-42dd-8835-1951c710c18b"
          className="w-[120px] sm:w-[160px] h-full lg:h-9 bg-cover"
          alt="Shibaji logo"
          data-aos="fade-right"
        />
      </Link>

      {/* SearchBar in Desktop */}
      <form onSubmit={handleSearch} className="hidden lg:inline">
        <TextInput
          id="navSearchDesktop"
          type="text"
          placeholder="Search ..."
          rightIcon={AiOutlineSearch}
          value={isSearchFromSearchBox ? searchInput : ""}
          sizing="sm"
          required
          className="font-[Inter] text-xs"
          onChange={(e) => setSearchInput(e.target.value)}
          onClick={() => setIsSearchFromSearchBox(true)}
        />
      </form>

      {/* SearchBar in Mobile */}
      <Popover content={content} trigger="click">
        <Button
          className="w-8 h-8 flex justify-center items-center lg:hidden"
          color="gray"
          pill
        >
          <AiOutlineSearch size="20" />
        </Button>
      </Popover>

      {/* Tabs, Theme changer, Toggle Profile */}
      <div
        className="flex items-center gap-3 md:order-2 relative"
        data-aos="fade-left"
      >
        <Button
          className="w-[fit-content] h-8 hidden sm:inline border focus:outline-none focus:ring-0"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon size="13" /> : <FaSun size="13" />}
        </Button>
        {currentUser ? (
          <Dropdown
            label={
              <Avatar
                rounded
                className="text-success font-[Inter] text-sm"
                size="sm"
                alt="user"
                img={currentUser.profilePicture}
              />
            }
            arrowIcon={true}
            inline
            className="absolute top-[60px] sm:top-[70px] right-0 z-[101] bg-white" // Updated positioning and styling for Dropdown
          >
            <Dropdown.Header>
              <span className="block text-xs font-medium font-[Inter">
                {currentUser.username}
              </span>
              <span className="block truncate text-xs font-[Inter] trancate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {currentUser.isAdmin && (
              <Link to="/admin-dashboard?tab=dashboard">
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
            <Dropdown.Item
              className="text-[14px] text-[blue] font-semibold font-[Inter]"
              onClick={handleSignOut}
            >
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

      <Navbar.Collapse className="bg-white dark:bg-[#1F2937]">
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link
            to="/"
            className="text-[16px] font-[Inter] font-semibold"
            onClick={(e) => handlePageChange(e, "/")}
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link
            to="/about"
            className="text-[16px] font-[Inter] font-semibold"
            onClick={(e) => handlePageChange(e, "/about")}
          >
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/search"} as={"div"}>
          <Link
            to={`${currentUser ? "/search?tab=all&page=1" : "/login"}`}
            className="text-[16px] font-[Inter] font-semibold"
            onClick={(e) => handlePageChange(e, "/search?tab=all&page=1")}
          >
            Content
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
