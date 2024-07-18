import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { Button } from "flowbite-react";
import { PostCommentSection, VideoCard } from "../components";
import { PiImageBrokenDuotone } from "react-icons/pi";
import { FaPlay, FaClock, FaPeopleGroup } from "react-icons/fa6";
import { LuCheckSquare } from "react-icons/lu";
import { IoFootball } from "react-icons/io5";
import { CiShirt } from "react-icons/ci";
import { BsConeStriped } from "react-icons/bs";
import { GiGoalKeeper, GiBabyfootPlayers } from "react-icons/gi";
import { CgCloseR } from "react-icons/cg";
import ReactPlayer from "react-player";

function VideoItem() {
  const { videoSlug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [fetchVideoDetails, setFetchVideoDetails] = useState(null);
  const [recentlyAddedVideo, setRecentlyAddedVideo] = useState(null);
  const [videoIsVisible, setVideoIsVisible] = useState(false);

  useEffect(() => {
    const getVideoFetchDetails = async () => {
      try {
        setIsLoading(true);
        setFetchError(false);
        const res = await fetch(`/api/video/getvideos?slug=${videoSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setFetchError(true);
          setIsLoading(false);
          return;
        }
        if (res.ok) {
          setFetchVideoDetails(data.videos[0]);
          setIsLoading(false);
          setFetchError(false);
        }
      } catch (error) {
        setFetchError(true);
        setIsLoading(false);
        console.log(error.message);
      }
    };

    const getRecentVideos = async () => {
      try {
        const res = await fetch(`/api/video/getRecentVideos`);
        const data = await res.json();
        if (res.ok) {
          setRecentlyAddedVideo(data.videos);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getVideoFetchDetails();
    getRecentVideos();
  }, [videoSlug]);

  useEffect(() => {
    const addBlankTargetToLinks = () => {
      const links = document.querySelectorAll(".post-item-content-style a");
      links.forEach((link) => {
        link.setAttribute("target", "_blank");
      });
    };

    addBlankTargetToLinks();
  }, [fetchVideoDetails]);

  if (isLoading) {
    return (
      <div className="min-h-screen mt-[65px] lg:mt-[76px] flex flex-col justify-center items-center">
        <RingLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <main className="min-h-screen mt-[65px] lg:mt-[76px] flex justify-center p-3">
      <div className="w-[90%] max-w-[1100px] my-5 flex flex-col items-center">
        <h1 className="font-[Inter] font-semibold lg:font-bold text-xl lg:text-3xl text-center">
          {fetchVideoDetails && fetchVideoDetails.title}
        </h1>

        {fetchVideoDetails && (
          <Link
            to={`/search?tab=practices&category=${
              fetchVideoDetails && fetchVideoDetails.category
            }`}
          >
            <Button
              color="gray"
              size="xs"
              pill
              className="text-xs font-[Inter] mt-5 lg:mt-8"
            >
              {fetchVideoDetails.category}
            </Button>
          </Link>
        )}

        {/* Practice Vdieo Section */}
        <div className="w-full h-[300px] sm:h-[500px] max-w-[900px] rounded-md lg:rounded-2xl mt-5 lg:mt-8 relative transition-all duration-500">
          <img
            src={fetchVideoDetails && fetchVideoDetails.thumbnailURL}
            alt={fetchVideoDetails && fetchVideoDetails.title}
            className={`w-full h-full object-cover rounded-md lg:rounded-2xl absolute top-0 left-0 right-0 bottom-0 filter ${
              videoIsVisible ? "blur-[5px]" : "blur-[1px]"
            }`}
          />
          {videoIsVisible ? (
            <div className="absolute w-full h-full flex items-center justify-center">
              <div className="w-[95%] h-[90%] max-w-[600px] max-h-[400px] flex flex-col gap-3">
                <CgCloseR
                  size="30"
                  className="self-end cursor-pointer text-white hover:text-red-500 hover:scale-[1.2] transition-all duration-300"
                  onClick={() => setVideoIsVisible(false)}
                />
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <ReactPlayer
                    url={fetchVideoDetails && fetchVideoDetails.videoURL}
                    className="react-player"
                    playing
                    controls
                    width="100%"
                    height="100%"
                    onEnded={() => setVideoIsVisible(false)} // Hide video after playback ends
                  />
                </div>
              </div>
            </div>
          ) : (
            <span
              className="absolute flex h-[fit-content] w-[fit-content] top-[38%] left-[38%] sm:top-[43%] sm:left-[43%] cursor-pointer hover:scale-[1.2] transition-all duration-300"
              onClick={() => setVideoIsVisible(true)}
            >
              <span className="animate-ping absolute h-full w-full rounded-full bg-red-300 opacity-75"></span>
              <span className="relative rounded-full h-[fit-content] w-[fit-content] bg-red-300 bg-opacity-50 backdrop-blur-sm p-3 flex items-center justify-center">
                <FaPlay size="40" color="red" />
              </span>
            </span>
          )}
        </div>
        {/* Practice Vdieo Section */}

        {/* Video related items */}
        <div className="w-full max-w-[900px] my-5 flex sm:items-center gap-5 flex-wrap">
          {/* Duration */}
          {fetchVideoDetails && fetchVideoDetails.videoDuration && (
            <div className="flex flex-col gap-2">
              <FaClock size="30" color="#94C120" />
              <p className="text-sm font-[Inter] font-semibold">DURATION</p>
              <span className="bg-[#F5F5F5] dark:bg-[#374151] p-2 rounded-lg text-xs font-[Inter] w-[fit-content]">
                {fetchVideoDetails.videoDuration} Minutes
              </span>
            </div>
          )}
          {/* Duration */}

          {/* Age Range */}
          {fetchVideoDetails && fetchVideoDetails.ageRange.length > 0 && (
            <div className="flex flex-col gap-2">
              <FaPeopleGroup size="30" color="#94C120" />
              <p className="text-sm font-[Inter] font-semibold">AGE RANGE</p>
              <div className="flex items-center flex-wrap gap-2">
                {fetchVideoDetails.ageRange.map((age) => (
                  <span
                    className="bg-[#F5F5F5] dark:bg-[#374151] p-2 rounded-lg text-xs font-[Inter] w-[fit-content]"
                    key={age}
                  >
                    {age}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* Age Range */}

          {/* Required Equipment */}
          {fetchVideoDetails &&
            fetchVideoDetails.requiredEquipments.length > 0 && (
              <div className="flex flex-col gap-2">
                <LuCheckSquare size="30" color="#94C120" />
                <p className="text-sm font-[Inter] font-semibold">
                  REQUIRED EQUIPMENT
                </p>
                <div className="flex items-center flex-wrap gap-2">
                  {fetchVideoDetails.requiredEquipments.map((equipment) => {
                    if (equipment === "Footballs") {
                      return (
                        <span
                          className="bg-[#F5F5F5] dark:bg-[#374151] p-2 rounded-lg text-xs font-[Inter] flex items-center gap-1 w-[fit-content]"
                          key={equipment}
                        >
                          <IoFootball size="20" color="#94C120" />
                          <span className="text-xs font-[Inter]">
                            {equipment}
                          </span>
                        </span>
                      );
                    }
                    if (equipment === "Bibs") {
                      return (
                        <span
                          className="bg-[#F5F5F5] dark:bg-[#374151] p-2 rounded-lg text-xs font-[Inter] flex items-center gap-1 w-[fit-content]"
                          key={equipment}
                        >
                          <CiShirt size="20" color="#94C120" />
                          <span className="text-xs font-[Inter]">
                            {equipment}
                          </span>
                        </span>
                      );
                    }
                    if (equipment === "Cones") {
                      return (
                        <span
                          className="bg-[#F5F5F5] dark:bg-[#374151] p-2 rounded-lg text-xs font-[Inter] flex items-center gap-1 w-[fit-content]"
                          key={equipment}
                        >
                          <BsConeStriped size="20" color="#94C120" />
                          <span className="text-xs font-[Inter]">
                            {equipment}
                          </span>
                        </span>
                      );
                    }
                    if (equipment === "Goals") {
                      return (
                        <span
                          className="bg-[#F5F5F5] dark:bg-[#374151] p-2 rounded-lg text-xs font-[Inter] flex items-center gap-1 w-[fit-content]"
                          key={equipment}
                        >
                          <GiGoalKeeper size="20" color="#94C120" />
                          <span className="text-xs font-[Inter]">
                            {equipment}
                          </span>
                        </span>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          {/* Required Equipment */}

          {/* Required Players */}
          {fetchVideoDetails &&
            fetchVideoDetails.requiredPlayers.length > 0 && (
              <div className="flex flex-col gap-2">
                <FaPeopleGroup size="30" color="#94C120" />
                <p className="text-sm font-[Inter] font-semibold">
                  REQUIRED PLAYERS
                </p>
                <div className="flex items-center flex-wrap gap-2">
                  {fetchVideoDetails.requiredPlayers.map((players) => (
                    <span
                      className="bg-[#F5F5F5] dark:bg-[#374151] p-2 rounded-lg text-xs font-[Inter] w-[fit-content]"
                      key={players}
                    >
                      {players} {parseInt(players) < 2 ? "Player" : "Players"}
                    </span>
                  ))}
                </div>
              </div>
            )}
          {/* Required Players */}
        </div>
        {/* Video related items */}

        {/* Video description section */}
        <div className="w-full max-w-[900px] flex justify-between text-[12px] font-[Inter] font-semibold px-2 pt-2 pb-4 dark:text-gray-500 border-b border-gray-300 dark:border-gray-600">
          <span>
            {fetchVideoDetails &&
              new Date(fetchVideoDetails.createdAt).toLocaleDateString()}
          </span>
          <span className="italic">
            {fetchVideoDetails &&
              `${(fetchVideoDetails.content.length / 1000).toFixed(
                0
              )} min to read`}
          </span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: fetchVideoDetails && fetchVideoDetails.content,
          }}
          className="w-full max-w-[850px] mt-5 post-item-content-style"
        ></div>
        {/* Video description section */}

        {/* Video comment section */}
        <PostCommentSection
          postId={fetchVideoDetails && fetchVideoDetails._id}
        />
        {/* Video comment section */}

        {/* More Videos Section */}
        <div className="flex flex-col items-center my-5 w-full">
          <h1 className="font-[Inter] text-sm sm:text-base font-medium text-gray-40">
            More Videos
          </h1>
          {!recentlyAddedVideo ? (
            <div className="flex flex-col items-center my-5">
              <PiImageBrokenDuotone size="100" className="text-gray-400" />
              <h1 className="text-base sm:text-lg text-gray-400 font-bold font-[Inter] text-center mt-5">
                Please check back later for more updates!
              </h1>
              <p className="text-xs font-[inter] text-gray-400 text-center mt-3 italic">
                Explore our repository of fresh content, curated to inform,
                entertain, and inspire you with every visit.
              </p>
              <Link to="/search?tab=videos">
                <Button
                  type="button"
                  gradientDuoTone="purpleToBlue"
                  outline
                  size="xs"
                  className="font-[Inter] mt-5"
                >
                  More videos
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2 flex-wrap mt-5">
              {recentlyAddedVideo.map((video) => (
                <VideoCard eachVideo={video} key={video._id} />
              ))}
            </div>
          )}
        </div>
        {/* More Videos Section */}
      </div>
    </main>
  );
}

export default VideoItem;
