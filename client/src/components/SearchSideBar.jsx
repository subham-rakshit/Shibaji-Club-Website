import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiDocumentText } from "react-icons/hi";
import { FaMinus, FaPhotoVideo } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdClose, MdOutlineContentPaste } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSearchPageSilder } from "../redux-slice/searchSliderSlice";

function SearchSideBar() {
  const [blogDropdown, setBlogDropdown] = useState(false);
  const [practiceDropdown, setPracticeDropdown] = useState(false);

  const [tab, setTab] = useState("");
  const [category, setCategory] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Tab: ", tab);
  console.log("Category: ", category);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const categoryFromUrl = urlParams.get("category");

    if (tabFromUrl || categoryFromUrl) {
      if (tabFromUrl) {
        setTab(tabFromUrl);
      } else {
        setTab("");
      }
      if (categoryFromUrl) {
        setCategory(categoryFromUrl);
      } else {
        setCategory("");
      }
    } else {
      setTab("");
      setCategory("");
    }
  }, [location.search]);

  return (
    <div className="w-full h-screen sm:w-56 py-5 px-3 flex flex-col bg-[#F9FAFB] dark:bg-[#1F2937]">
      <MdClose
        size="25"
        className="self-end hover:text-red-500 cursor-pointer"
        onClick={() => dispatch(toggleSearchPageSilder())}
      />

      <ul className="flex flex-col gap-3 my-5 transition-all duration-500">
        <Link to="/search?tab=all">
          <li
            className={`flex items-center gap-5 cursor-pointer hover:bg-gray-100 hover:dark:bg-[#374151] py-2 px-2 rounded-lg ${
              tab === "all" &&
              "bg-gray-100 dark:bg-[#374151] shadow-custom-light-dark"
            } transition-all duration-300`}
            onClick={() => {
              setBlogDropdown(false);
              setPracticeDropdown(false);
            }}
          >
            <MdOutlineContentPaste
              size="30"
              className="text-gray-500 dark:text-gray-400"
            />
            <p className="text-md font-[Inter] font-semibold text-gray-600 dark:text-gray-300">
              All Content
            </p>
          </li>
        </Link>

        {/* Blogs Sidebar */}
        <Link to="/search?tab=blogs">
          <li
            className={`flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-[#374151] py-2 px-2 rounded-lg ${
              tab === "blogs" &&
              "bg-gray-100 dark:bg-[#374151] shadow-custom-light-dark"
            } transition-all duration-300`}
            onClick={() => {
              setBlogDropdown((prev) =>
                tab === "blogs" && category && !prev ? prev : !prev
              );
              setPracticeDropdown(false);
            }}
          >
            <div className="flex items-center gap-5">
              <HiDocumentText
                size="30"
                className="text-gray-500 dark:text-gray-400"
              />
              <p className="text-md font-[Inter] font-semibold text-gray-600 dark:text-gray-300">
                Blogs
              </p>
            </div>
            {blogDropdown || (tab === "blogs" && category) ? (
              <FaMinus size="15" />
            ) : (
              <FaPlus size="15" />
            )}
          </li>
        </Link>

        <li
          className={`${
            blogDropdown || (tab === "blogs" && category) ? "inline" : "hidden"
          } flex flex-col gap-2 my-2 transition-all duration-300 mx-5`}
        >
          <Link to="/search?tab=blogs&category=about club">
            <p
              className={`text-sm font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                category === "about club" &&
                "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
              }`}
            >
              About Club
            </p>
          </Link>
          <Link to="/search?tab=blogs&category=matches">
            <p
              className={`text-sm font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                category === "matches" &&
                "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
              }`}
            >
              Matches
            </p>
          </Link>
          <Link to="/search?tab=blogs&category=practices">
            <p
              className={`text-sm font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                category === "practices" &&
                "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
              }`}
            >
              Practices
            </p>
          </Link>
          <Link to="/search?tab=blogs&category=others">
            <p
              className={`text-sm font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                category === "others" &&
                "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
              }`}
            >
              Others
            </p>
          </Link>
          <Link to="/search?tab=blogs&category=euro cup 2024">
            <p
              className={`text-sm font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                category === "euro cup 2024" &&
                "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
              }`}
            >
              Euro Cup 2024
            </p>
          </Link>
        </li>
        {/* Blogs Sidebar */}

        {/* Prctices Sidebar */}
        <Link to="/search?tab=practices">
          <li
            className={`flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-[#374151] py-2 px-2 rounded-lg ${
              tab === "practices" &&
              "bg-gray-100 dark:bg-[#374151] shadow-custom-light-dark"
            } transition-all duration-300`}
            onClick={() => {
              setPracticeDropdown((prev) =>
                tab === "practices" && category && !prev ? prev : !prev
              );
              setBlogDropdown(false);
            }}
          >
            <div className="flex items-center gap-5">
              <FaPhotoVideo
                size="30"
                className="text-gray-500 dark:text-gray-400"
              />
              <p className="text-md font-[Inter] font-semibold text-gray-600 dark:text-gray-300">
                Practices
              </p>
            </div>
            {practiceDropdown || (tab === "practices" && category) ? (
              <FaMinus size="15" />
            ) : (
              <FaPlus size="15" />
            )}
          </li>
        </Link>

        <li
          className={`${
            practiceDropdown || (tab === "practices" && category)
              ? "inline"
              : "hidden"
          } flex flex-col gap-2 my-2 transition-all duration-500 mx-5`}
        >
          <Link to="/search?tab=practices&category=outfield">
            <p
              className={`text-sm font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                category === "outfield" &&
                "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
              }`}
            >
              Outfield
            </p>
          </Link>
          <Link to="/search?tab=practices&category=one to one">
            <p
              className={`text-sm font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                category === "one to one" &&
                "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
              }`}
            >
              One to One
            </p>
          </Link>
          <Link to="/search?tab=practices&category=saq">
            <p
              className={`text-sm font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                category === "saq" &&
                "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
              }`}
            >
              SAQ
            </p>
          </Link>
          <Link to="/search?tab=practices&category=goalkeepers">
            <p
              className={`text-sm font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                category === "goalkeepers" &&
                "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
              }`}
            >
              Goalkeepers
            </p>
          </Link>
          <Link to="/search?tab=practices&category=tutorials">
            <p
              className={`text-sm font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                category === "tutorials" &&
                "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
              }`}
            >
              Tutorials
            </p>
          </Link>
          <Link to="/search?tab=practices&category=youth curriculums">
            <p
              className={`text-sm font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                category === "youth curriculums" &&
                "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
              }`}
            >
              Youth Curriculums
            </p>
          </Link>
        </li>
        {/* Practices Sidebar */}
      </ul>
    </div>
  );
}

export default SearchSideBar;
