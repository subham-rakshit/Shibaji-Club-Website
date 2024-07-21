import React, { useEffect, useState } from "react";
import SearchToggleButton from "./SearchToggleButton";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import VideoCard from "./VideoCard";
import { Button } from "flowbite-react";
import Pagination from "./Pagination";

function SearchPractices({
  tab,
  category,
  searchItem,
  currentPage,
  onChangePage,
}) {
  const [allContentData, setAllContentData] = useState([]);
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
          `/api/search/allcontent?tab=${tab}&category=${category}&searchItem=${searchItem}&page=${currentPage}`
        );
        const data = await res.json();

        if (res.ok) {
          setAllContentData(data.videosList || []);
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
  }, [tab, searchItem, category, currentPage]); // Depend on tab, searchItem and category directly

  return (
    <div
      className={`w-full max-w-[1024px] min-h-screen mx-auto p-5 ${
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
              Total Videos
            </h1>
            <span className="min-w-8 min-h-8 text-center text-sm text-cyan-500 font-[Inter] font-semibold border p-1 shadow-custom-light-dark rounded-full">
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
                {dataFetchError}
              </p>
              <Link to="/search?tab=practices&page=1">
                <Button
                  type="button"
                  gradientDuoTone="purpleToPink"
                  outline
                  className="my-5"
                >
                  All Practices
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {allContentData.length === 0 ? (
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
                    looking for. Alternatively, click the 'All Practices' button
                    to view everything at once.
                  </p>
                  <Link to="/search?tab=practices&page=1">
                    <Button
                      type="button"
                      gradientDuoTone="purpleToPink"
                      outline
                      className="my-5"
                    >
                      All Practices
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="flex items-center flex-wrap gap-4 my-5 mx-auto">
                    {allContentData.map((item) => (
                      <li
                        className="shadow-custom-light-dark rounded-lg"
                        key={item._id}
                      >
                        <VideoCard eachVideo={item} />
                      </li>
                    ))}
                  </ul>
                  {!isLoading && !dataFetchError && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onChangePage={onChangePage}
                    />
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

export default SearchPractices;
