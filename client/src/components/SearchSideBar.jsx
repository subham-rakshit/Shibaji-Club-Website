import React, { useState } from "react";
import { HiDocumentText } from "react-icons/hi";
import { FaMinus, FaPhotoVideo } from "react-icons/fa";
import { FaPlus, FaRegClock } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { MdClose, MdOutlineContentPaste } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchPageSilder } from "../redux-slice/searchSliderSlice";
import { Button } from "flowbite-react";

function SearchSideBar({ tab, category, searchItem }) {
  const { currentUser } = useSelector((state) => state.user);
  const [blogDropdown, setBlogDropdown] = useState(false);
  const [practiceDropdown, setPracticeDropdown] = useState(false);
  const [nutritionDropdown, setNutritionDropdown] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="w-full min-h-full sm:w-56 py-5 px-3 flex flex-col bg-[#F7F7F7] dark:bg-[#223141]">
      <div>
        <MdClose
          size="25"
          className="ml-auto hover:text-red-500 cursor-pointer"
          onClick={() => dispatch(toggleSearchPageSilder())}
        />

        <ul className="flex flex-col gap-3 my-5 transition-all duration-500">
          {/* All Content Tab */}
          <Link
            to={
              currentUser
                ? `/search?tab=all${
                    searchItem ? `&searchItem=${searchItem}` : ""
                  }&page=1`
                : "/login"
            }
          >
            <li
              className={`flex items-center gap-5 cursor-pointer hover:bg-gray-100 hover:dark:bg-[#374151] py-2 px-2 rounded-lg ${
                tab === "all" &&
                "bg-gray-100 dark:bg-[#374151] shadow-custom-light-dark"
              } transition-all duration-300`}
              onClick={() => {
                setBlogDropdown(false);
                setPracticeDropdown(false);
                setNutritionDropdown(false);
              }}
            >
              <MdOutlineContentPaste className="text-gray-500 dark:text-gray-400 text-lg sm:text-2xl" />
              <p className="text-xs sm:text-sm font-[Inter] font-semibold text-gray-600 dark:text-gray-300">
                All Content
              </p>
            </li>
          </Link>
          {/* All Content Tab */}

          {/* Blogs Tab */}
          <Link
            to={
              currentUser
                ? `/search?tab=blogs${
                    searchItem ? `&searchItem=${searchItem}` : ""
                  }&page=1`
                : "/login"
            }
          >
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
                setNutritionDropdown(false);
              }}
            >
              <div className="flex items-center gap-5">
                <HiDocumentText className="text-gray-500 dark:text-gray-400 text-lg sm:text-2xl" />
                <p className="text-xs sm:text-sm font-[Inter] font-semibold text-gray-600 dark:text-gray-300">
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
          {/* Blogs category */}
          <li
            className={`${
              blogDropdown || (tab === "blogs" && category)
                ? "inline"
                : "hidden"
            } flex flex-col gap-1 my-1 transition-all duration-300 mx-5`}
          >
            <Link
              to={
                currentUser
                  ? `/search?tab=blogs&category=about club${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "about club" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                About Club
              </div>
            </Link>
            <Link
              to={
                currentUser
                  ? `/search?tab=blogs&category=matches${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "matches" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Matches
              </div>
            </Link>
            <Link
              to={
                currentUser
                  ? `/search?tab=blogs&category=practices${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "practices" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Practices
              </div>
            </Link>
            <Link
              to={
                currentUser
                  ? `/search?tab=blogs&category=euro cup 2024${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "euro cup 2024" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Euro Cup 2024
              </div>
            </Link>
          </li>
          {/* Blogs Tab */}

          {/* Prctices Tab */}
          <Link
            to={
              currentUser
                ? `/search?tab=practices${
                    searchItem && `&searchItem=${searchItem}`
                  }&page=1`
                : "/login"
            }
          >
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
                setNutritionDropdown(false);
              }}
            >
              <div className="flex items-center gap-5">
                <FaPhotoVideo className="text-gray-500 dark:text-gray-400 text-lg sm:text-2xl" />
                <p className="text-xs sm:text-sm font-[Inter] font-semibold text-gray-600 dark:text-gray-300">
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
          {/* Practices category */}
          <li
            className={`${
              practiceDropdown || (tab === "practices" && category)
                ? "inline"
                : "hidden"
            } flex flex-col gap-1 my-2 transition-all duration-500 mx-5`}
          >
            {/* Outfield */}
            <Link
              to={
                currentUser
                  ? `/search?tab=practices&category=outfield${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "outfield" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Outfield
              </div>
            </Link>

            {/* One to One */}
            <Link
              to={
                currentUser
                  ? `/search?tab=practices&category=one to one${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "one to one" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                One to One
              </div>
            </Link>

            {/* SAQ */}
            <Link
              to={
                currentUser
                  ? `/search?tab=practices&category=saq${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "saq" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                SAQ
              </div>
            </Link>

            {/* Goalkeepers */}
            <Link
              to={
                currentUser
                  ? `/search?tab=practices&category=goalkeepers${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "goalkeepers" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Goalkeepers
              </div>
            </Link>

            {/* Tutorials */}
            <Link
              to={
                currentUser
                  ? `/search?tab=practices&category=tutorials${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "tutorials" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Tutorials
              </div>
            </Link>

            {/* Yout Curriculums */}
            <Link
              to={
                currentUser
                  ? `/search?tab=practices&category=youth curriculums${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "youth curriculums" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Youth Curriculums
              </div>
            </Link>

            {/* Fit Challenge */}
            <Link
              to={
                currentUser
                  ? `/search?tab=practices&category=fit challenge${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "fit challenge" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Fit Challenge
              </div>
            </Link>

            {/* Strength Training */}
            <Link
              to={
                currentUser
                  ? `/search?tab=practices&category=strength training${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "strength training" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Strength Training
              </div>
            </Link>

            {/* Club Insides */}
            <Link
              to={
                currentUser
                  ? `/search?tab=practices&category=club%20insides${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "club insides" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Club Insides
              </div>
            </Link>

            {/* Matches */}
            <Link
              to={
                currentUser
                  ? `/search?tab=practices&category=matches${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "matches" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Matches
              </div>
            </Link>
          </li>
          {/* Practices Tab */}

          {/* Nutrition Tab */}
          <Link
            to={
              currentUser
                ? `/search?tab=nutrition${
                    searchItem && `&searchItem=${searchItem}`
                  }&page=1`
                : "/login"
            }
          >
            <li
              className={`flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-[#374151] py-2 px-2 rounded-lg ${
                tab === "nutrition" &&
                "bg-gray-100 dark:bg-[#374151] shadow-custom-light-dark"
              } transition-all duration-300`}
              onClick={() => {
                setNutritionDropdown((prev) =>
                  tab === "nutrition" && category && !prev ? prev : !prev
                );
                setBlogDropdown(false);
                setPracticeDropdown(false);
              }}
            >
              <div className="flex items-center gap-5">
                <GiMeal className="text-gray-500 dark:text-gray-400 text-lg sm:text-2xl" />
                <p className="text-xs sm:text-sm font-[Inter] font-semibold text-gray-600 dark:text-gray-300">
                  Nutrition
                </p>
              </div>
              {nutritionDropdown || (tab === "nutrition" && category) ? (
                <FaMinus size="15" />
              ) : (
                <FaPlus size="15" />
              )}
            </li>
          </Link>
          {/* Nutrition category */}
          <li
            className={`${
              nutritionDropdown || (tab === "nutrition" && category)
                ? "inline"
                : "hidden"
            } flex flex-col gap-1 my-1 transition-all duration-300 mx-5`}
          >
            <Link
              to={
                currentUser
                  ? `/search?tab=nutrition&category=breakfast${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "breakfast" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Breakfast
              </div>
            </Link>
            <Link
              to={
                currentUser
                  ? `/search?tab=nutrition&category=mains${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "mains" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Mains
              </div>
            </Link>
            <Link
              to={
                currentUser
                  ? `/search?tab=nutrition&category=snacks${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "snacks" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Snacks
              </div>
            </Link>
            <Link
              to={
                currentUser
                  ? `/search?tab=nutrition&category=dinners${
                      searchItem && `&searchItem=${searchItem}`
                    }&page=1`
                  : "/login"
              }
            >
              <div
                className={`text-xs font-[Inter] p-2 rounded-md text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  category === "dinners" &&
                  "bg-gray-100 dark:bg-[#374151] font-semibold scale-[1.1] shadow-custom-light-dark"
                }`}
              >
                Dinners
              </div>
            </Link>
          </li>
          {/* Nutrition Tab */}

          {/* Save Videos Tab */}
          <Link to={currentUser ? `/search?tab=savedvideos` : "/login"}>
            <li
              className={`flex items-center gap-5 cursor-pointer hover:bg-gray-100 hover:dark:bg-[#374151] py-2 px-2 rounded-lg ${
                tab === "savedvideos" &&
                "bg-gray-100 dark:bg-[#374151] shadow-custom-light-dark"
              } transition-all duration-300`}
              onClick={() => {
                setBlogDropdown(false);
                setPracticeDropdown(false);
                setNutritionDropdown(false);
              }}
            >
              <FaRegClock className="text-gray-500 dark:text-gray-400 text-lg sm:text-2xl" />
              <p className="text-xs sm:text-sm font-[Inter] font-semibold text-gray-600 dark:text-gray-300">
                Watch Later
              </p>
            </li>
          </Link>
          {/* Save Videos Tab */}
        </ul>
      </div>

      <Link to={currentUser ? "/search?tab=all&page=1" : "/login"}>
        <Button
          type="button"
          gradientDuoTone="purpleToPink"
          outline
          size="xs"
          className="font-[Inter] bg-transparent shadow-custom-light-dark w-full"
          onClick={() => {
            setBlogDropdown(false);
            setPracticeDropdown(false);
            setNutritionDropdown(false);
          }}
        >
          Clear Filter
        </Button>
      </Link>
    </div>
  );
}

export default SearchSideBar;
