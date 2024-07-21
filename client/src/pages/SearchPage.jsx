import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SearchSideBar,
  SearchAllContent,
  SearchPractices,
  SearchBlogs,
  SearchNutrition,
  SavedVideos,
} from "../components";
import { useSelector } from "react-redux";

function SearchPage() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [category, setCategory] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { isSearchSlide } = useSelector((state) => state.searchSlider);

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab") || "";
    const categoryFromUrl = urlParams.get("category") || "";
    const searchItemFromUrl = urlParams.get("searchItem") || "";
    const pageFormURL = parseInt(urlParams.get("page") || 1);

    setTab(tabFromUrl);
    setCategory(categoryFromUrl);
    setSearchItem(searchItemFromUrl);
    setCurrentPage(pageFormURL);
  }, [location.search]);

  const onChangePage = (page) => {
    setCurrentPage(page);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", page);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen mt-[60px] sm:mt-[70px] relative">
      {/* Dashboard Left Side Bar */}
      <div
        className={`z-50 absolute top-0 ${
          isSearchSlide === "true" ? "left-[-100%]" : "left-0"
        } transition-all duration-500 shadow-custom-light-dark dark:shadow-custom-dark-light rounded-tr-lg rounded-br-lg overflow-auto h-full search-side-bar`}
      >
        <SearchSideBar tab={tab} category={category} searchItem={searchItem} />
      </div>

      {/* Dashboard COntent According to selected tab */}
      {tab === "all" && (
        <SearchAllContent
          tab={tab}
          searchItem={searchItem}
          currentPage={currentPage}
          onChangePage={onChangePage}
        />
      )}
      {tab === "blogs" && (
        <SearchBlogs
          tab={tab}
          category={category}
          searchItem={searchItem}
          currentPage={currentPage}
          onChangePage={onChangePage}
        />
      )}
      {tab === "practices" && (
        <SearchPractices
          tab={tab}
          category={category}
          searchItem={searchItem}
          currentPage={currentPage}
          onChangePage={onChangePage}
        />
      )}
      {tab === "nutrition" && (
        <SearchNutrition
          tab={tab}
          category={category}
          searchItem={searchItem}
          currentPage={currentPage}
          onChangePage={onChangePage}
        />
      )}

      {tab === "savedvideos" && <SavedVideos />}
    </div>
  );
}

export default SearchPage;
