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
  const [category, setCategory] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const { isSearchSlide } = useSelector((state) => state.searchSlider);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab") || "";
    const categoryFromUrl = urlParams.get("category") || "";
    const searchItemFromUrl = urlParams.get("searchItem") || "";

    setTab(tabFromUrl);
    setCategory(categoryFromUrl);
    setSearchItem(searchItemFromUrl);
  }, [location.search]);

  return (
    <div className="min-h-screen mt-[65px] lg:mt-[70px] relative">
      {/* Dashboard Left Side Bar */}
      <div
        className={`z-50 absolute top-0 ${
          isSearchSlide === "true" ? "left-[-100%]" : "left-0"
        } transition-all duration-500 shadow-custom-light-dark dark:shadow-custom-dark-light rounded-tr-lg rounded-br-lg overflow-hidden`}
      >
        <SearchSideBar tab={tab} category={category} searchItem={searchItem} />
      </div>

      {/* Dashboard COntent According to selected tab */}
      {tab === "all" && <SearchAllContent tab={tab} searchItem={searchItem} />}
      {tab === "blogs" && (
        <SearchBlogs tab={tab} category={category} searchItem={searchItem} />
      )}
      {tab === "practices" && (
        <SearchPractices
          tab={tab}
          category={category}
          searchItem={searchItem}
        />
      )}
    </div>
  );
}

export default SearchPage;
