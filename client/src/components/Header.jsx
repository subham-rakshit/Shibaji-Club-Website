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
import { useEffect, useState } from "react";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const currentUserDetails = useSelector((state) => state.user.currentUser);
  const { theme } = useSelector((state) => state.theme);
  const path = useLocation().pathname;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchItemFromURL = urlParams.get("searchItem");

    if (searchItemFromURL) {
      setSearchInput(searchItemFromURL);
    }
  }, [location.search]);

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
    <Navbar className="fixed top-0 left-0 z-[100] w-full flex items-center justify-between gap-1 shadow-lg">
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

      {/* SearchBar in Desktop */}
      <form onSubmit={handleSearch} className="hidden lg:inline">
        <TextInput
          id="navSearchDesktop"
          type="text"
          placeholder="Search ..."
          rightIcon={AiOutlineSearch}
          value={searchInput}
          sizing="sm"
          required
          className="font-[Inter] text-xs"
          onChange={(e) => setSearchInput(e.target.value)}
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

      <div className="flex items-center gap-3 md:order-2">
        <Button
          className="w-[fit-content] h-8 hidden sm:inline border focus:outline-none focus:ring-0"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon size="13" /> : <FaSun size="13" />}
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

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/" className="text-[16px] font-[Inter] font-semibold">
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about" className="text-[16px] font-[Inter] font-semibold">
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/search"} as={"div"}>
          <Link
            to="/search?tab=all"
            className="text-[16px] font-[Inter] font-semibold"
          >
            Content
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
