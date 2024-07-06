import React, { useEffect, useState } from "react";
import SearchToggleButton from "./SearchToggleButton";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import PostCard from "./PostCard";
import VideoCard from "./VideoCard";
import { Button } from "flowbite-react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

function SearchAllContent({ tab, searchItem, currentPage, onChangePage }) {
  const [allContentData, setAllContentData] = useState(null);
  const [dataFetchError, setDataFetchError] = useState(null);
  const [totalItem, setTotalItem] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getAllData = async () => {
      try {
        setIsLoading(true);
        setDataFetchError(null);
        const res = await fetch(
          `/api/search/allcontent?tab=${tab}&searchItem=${searchItem}&page=${currentPage}`
        );
        const data = await res.json();

        if (res.ok) {
          setAllContentData(data.shuffleList || []);
          setTotalItem(data.totalItem || 0);
          setTotalPages(data.totalPages || 1);
        } else {
          setDataFetchError(data.extraDetails || "Error fetching data");
        }
      } catch (error) {
        console.error(error.message);
        setDataFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getAllData();
  }, [tab, searchItem, currentPage]); // Depend on tab, searchItem and currentPage(Pagination) directly

  //* Handle page changes -->
  const handlePageChange = (page) => {
    onChangePage(page);
  };

  //* Pagination buttons -->
  const renderPaginationButtons = () => {
    const maxButtons = 5; // Maximum number of buttons to display
    const startPageIndex = Math.max(1, currentPage - 2);
    const endPageIndex = Math.min(startPageIndex + maxButtons - 1, totalPages);

    let buttons = [];

    for (
      let pageIndex = startPageIndex;
      pageIndex <= endPageIndex;
      pageIndex++
    ) {
      buttons.push(
        <button
          type="button"
          key={pageIndex}
          onClick={() => handlePageChange(pageIndex)}
          className={`px-3 py-1 mx-1 rounded-full border font-[Inter] ${
            currentPage === pageIndex
              ? "bg-blue-500 text-white shadow-custom-light-dark"
              : "bg-white text-blue-500 border-blue-500"
          } hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out`}
        >
          {pageIndex}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div
      className={`w-full max-w-[1024px] h-screen mx-auto p-5 overflow-auto hide-scrollbar transition-all duration-300 ${
        isLoading ? "flex justify-center items-center" : ""
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
              <Link to="/search?tab=all&page=1">
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
                  <Link to="/search?tab=all&tab=1">
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
                  <ul className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-4 my-5 mx-auto">
                    {allContentData &&
                      allContentData.map((item) => (
                        <li
                          className="shadow-custom-light-dark rounded-lg mx-auto"
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
                  {!isLoading && !dataFetchError && (
                    <div className="flex justify-center items-center mt-4">
                      <button
                        type="button"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 mx-5 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out font-[Inter] font-medium text-sm flex items-center ${
                          currentPage === 1
                            ? "cursor-not-allowed line-through"
                            : ""
                        }`}
                      >
                        {currentPage !== 1 && (
                          <FaLongArrowAltLeft className="w-4 h-4 inline-block mr-2" />
                        )}
                        <span>Previous</span>
                      </button>
                      {renderPaginationButtons()}
                      <button
                        type="button"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 mx-5 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out font-[Inter] font-medium text-sm flex items-center ${
                          currentPage === totalPages
                            ? "cursor-not-allowed line-through"
                            : ""
                        }`}
                      >
                        <span>Next</span>
                        {currentPage !== totalPages && (
                          <FaLongArrowAltRight className="w-4 h-4 inline-block ml-2" />
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SearchAllContent;
