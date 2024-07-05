import React, { useEffect, useState } from "react";
import SearchToggleButton from "./SearchToggleButton";
import { Link, useLocation } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import PostCard from "./PostCard";
import VideoCard from "./VideoCard";
import { Button } from "flowbite-react";

function SearchAllContent() {
  const location = useLocation();
  const [tab, setTab] = useState("all"); // Default to 'all' since i am fetching 'all' by default
  const [searchItem, setSearchItem] = useState("");
  const [allContentData, setAllContentData] = useState(null);
  const [dataFetchError, setDataFetchError] = useState(null);
  const [totalItem, setTotalItem] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab") || "all"; // Default to 'all'
    const searchFormURL = urlParams.get("searchItem") || "";
    setTab(tabFromUrl);
    setSearchItem(searchFormURL);
  }, [location.search]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        setIsLoading(true);
        setDataFetchError(null);
        const res = await fetch(
          `/api/search/allcontent?tab=${tab}${
            searchItem ? `&searchItem=${searchItem}` : ""
          }`
        );
        const data = await res.json();

        if (res.ok) {
          setAllContentData(data.shuffleList || []);
          setTotalItem(data.totalItem || 0);
          setIsLoading(false);
        } else {
          setDataFetchError(data.extraDetails || "Error fetching data");
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error.message);
        setDataFetchError(error.message);
        setIsLoading(false);
      }
    };

    getAllData();
  }, [tab, searchItem]); // Depend on tab and searchItem directly

  return (
    <div
      className={`w-full max-w-[1024px] h-screen mx-auto p-5 overflow-auto hide-scrollbar ${
        isLoading && "flex justify-center items-center"
      }`}
    >
      {isLoading ? (
        <PacmanLoader color="#36d7b7" />
      ) : (
        <>
          <div className="flex items-center gap-5">
            <SearchToggleButton />
            <h1 className="text-lg sm:text-lg font-[Inter] font-bold">
              Total Content
            </h1>
            <span className="min-w-8 min-h-8 text-center text-sm text-cyan-500 font-[Inter] font-semibold border p-1">
              {totalItem}
            </span>
          </div>
          {dataFetchError ? (
            <div className="min-h-screen flex flex-col justify-center items-center my-5 p-5">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/404%20bg%20rmove.png?alt=media&token=d7c415d5-c276-4cc9-8145-92e5bdf58365"
                alt="404 not found"
              />
              <p className="text-lg sm:text-2xl font-[Inter] font-bold mt-2">
                Oops! Something went wrong.
              </p>
              <p className="text-sm sm:text-base font-[Inter] font-normal text-center my-5">
                {dataFetchError && dataFetchError}
              </p>
              <Link to="/search?tab=all">
                <Button
                  type="button"
                  gradientDuoTone="purpleToPink"
                  outline
                  className="my-5"
                >
                  All Content
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {allContentData && allContentData.length === 0 ? (
                <div className="min-h-screen flex flex-col justify-center items-center my-5 p-5">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/404%20bg%20rmove.png?alt=media&token=d7c415d5-c276-4cc9-8145-92e5bdf58365"
                    alt="404 not found"
                  />
                  <h1 className="text-lg sm:text-2xl font-[Inter] font-bold mt-2">
                    Oops! nothing to see here.
                  </h1>
                  <p className="text-sm sm:text-base font-[Inter] font-normal text-center my-5">
                    Sorry, we couldn't find what you are looking for.
                  </p>
                  <p className="text-sm sm:text-base font-[Inter] font-normal text-center">
                    Feel free to switch tabs to see if you can find what you're
                    looking for. Alternatively, click the 'All Content' button
                    to view everything at once.
                  </p>
                  <Link to="/search?tab=all">
                    <Button
                      type="button"
                      gradientDuoTone="purpleToPink"
                      outline
                      className="my-5"
                    >
                      All Content
                    </Button>
                  </Link>
                </div>
              ) : (
                <ul className="flex items-center flex-wrap gap-4 my-5 mx-auto">
                  {allContentData &&
                    allContentData.map((item) => (
                      <li
                        className="shadow-custom-light-dark rounded-lg"
                        key={item._id}
                      >
                        {Object.keys(item).includes("blogImage") ? (
                          <PostCard eachPost={item} />
                        ) : (
                          <VideoCard eachVideo={item} />
                        )}
                      </li>
                    ))}
                </ul>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SearchAllContent;
