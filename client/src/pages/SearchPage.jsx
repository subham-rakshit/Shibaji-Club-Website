import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  SearchSideBar,
  SearchAllContent,
  SearchPractices,
  SearchBlogs,
} from "../components";
import { useSelector } from "react-redux";

function SearchPage() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { isSearchSlide } = useSelector((state) => state.searchSlider);
  // console.log(isSearchSlide);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab("");
    }
  }, [location.search]);

  return (
    <div className="min-h-screen mt-[65px] lg:mt-[70px] relative">
      {/* Dashboard Left Side Bar */}
      <div
        className={`absolute top-0 ${
          isSearchSlide === "true" ? "left-[-100%]" : "left-0"
        } transition-all duration-500 shadow-custom-light-dark dark:shadow-custom-dark-light`}
      >
        <SearchSideBar />
      </div>

      {/* Dashboard COntent According to selected tab */}
      {tab === "all" && <SearchAllContent />}
      {tab === "blogs" && <SearchBlogs />}
      {tab === "practices" && <SearchPractices />}
    </div>
  );
}

export default SearchPage;
