import React, { useEffect, useState } from "react";
import SearchToggleButton from "./SearchToggleButton";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import VideoCard from "./VideoCard";
import { Button } from "flowbite-react";
import { useSelector } from "react-redux";

function SavedVideos() {
  const { currentUser } = useSelector((state) => state.user);
  const [videoDetailsList, setVideoDetailsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch video details
  const getVideoDetails = async (videoId) => {
    try {
      const res = await fetch(`/api/video/getVideos?videoId=${videoId}`);
      const data = await res.json();
      if (res.ok) {
        return data.videos[0];
      } else {
        return "Faild to fetch video";
      }
    } catch (error) {
      console.log(error.message);
      return "Back-end Error";
    }
  };

  // We itterate on currentUser.savedVideos array and we are call an API for each videoId to fetch the videoDetails
  useEffect(() => {
    const fetchVideoDetails = async () => {
      setIsLoading(true);
      try {
        const details = [];
        for (const videoId of currentUser.savedVideos) {
          const video = await getVideoDetails(videoId);
          details.push(video);
        }
        setVideoDetailsList(details);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (currentUser && currentUser.savedVideos.length > 0) {
      fetchVideoDetails();
    }
  }, [currentUser]); // each time currentUser value changed this useEffect calls

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
              Total Videos
            </h1>
            <span className="min-w-8 min-h-8 text-center text-sm text-cyan-500 font-[Inter] font-semibold border p-1 shadow-custom-light-dark rounded-full">
              {currentUser && currentUser.savedVideos.length}
            </span>
          </div>

          {currentUser && currentUser.savedVideos.length === 0 ? (
            <div className="min-h-screen flex flex-col justify-center items-center my-5 p-5">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/404%20bg%20rmove.png?alt=media&token=d7c415d5-c276-4cc9-8145-92e5bdf58365"
                alt="404 not found"
              />
              <h1 className="text-lg sm:text-2xl font-[Inter] font-bold mt-2">
                Oops! No Saved Videos.
              </h1>
              <p className="text-sm sm:text-base font-[Inter] font-normal text-center my-5">
                You have not saved any videos yet. Start exploring and save your
                favorite videos to watch later!
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
                {videoDetailsList.length > 0 &&
                  videoDetailsList.map((video) => (
                    <li
                      className="shadow-custom-light-dark rounded-lg"
                      key={video.title}
                    >
                      <VideoCard eachVideo={video} />
                    </li>
                  ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SavedVideos;
