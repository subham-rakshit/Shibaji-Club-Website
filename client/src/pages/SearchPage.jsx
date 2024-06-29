import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  SearchSideBar,
  SearchAllContent,
  SearchPractices,
  SearchBlogs,
} from "../components";

function SearchPage() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  console.log(tab);

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
    <div className="min-h-screen mt-[65px] lg:mt-[77px] flex flex-col md:flex-row">
      {/* Dashboard Left Side Bar */}
      <div className="md:w-56">
        <SearchSideBar />
      </div>
      {/* Dashboard COntent According to selected tab */}
      {tab === "all" && <SearchAllContent />}
      {tab === "practices" && <SearchPractices />}
      {tab === "blogs" && <SearchBlogs />}
    </div>
  );
}

export default SearchPage;
