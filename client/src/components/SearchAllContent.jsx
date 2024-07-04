import React, { useEffect } from "react";
import SearchToggleButton from "./SearchToggleButton";
import { useLocation } from "react-router-dom";

function SearchAllContent() {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const searchFormURL = urlParams.get("searchItem");
    console.log(location);
    console.log("Tab: ", tabFromUrl);
    console.log("SearchItem: : ", searchFormURL);
  }, [location.search]);
  return (
    <div className="w-full max-w-[1200px] h-screen border mx-auto p-5">
      <SearchToggleButton />
    </div>
  );
}

export default SearchAllContent;
