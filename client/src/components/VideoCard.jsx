import React, { useState } from "react";
import { Link } from "react-router-dom";

function VideoCard({ eachVideo, mainHeight, imageHeight }) {
  const [isClick, setIsClick] = useState(false);
  return (
    <div
      className={`w-full ${
        mainHeight && "max-w-[300px]"
      } sm:max-w-[300px] border dark:border-gray-600 group relative ${
        mainHeight ? `${mainHeight}` : "h-[400px]"
      } overflow-hidden rounded-lg transition-all duration-500`}
    >
      {mainHeight ? (
        <Link to={`/video/${eachVideo.slug}`}>
          <img
            src={eachVideo.thumbnailURL}
            alt={eachVideo.title}
            className={`${
              imageHeight ? `${imageHeight}` : "h-[260px]"
            } w-full object-cover group-hover:h-[200px] ${
              isClick && "h-[200px]"
            } transition-all duration-500 z-20`}
          />
        </Link>
      ) : (
        <img
          src={eachVideo.thumbnailURL}
          alt={eachVideo.title}
          className={`${
            imageHeight ? `${imageHeight}` : "h-[260px]"
          } w-full object-cover group-hover:h-[200px] ${
            isClick && "h-[200px]"
          } transition-all duration-500 z-20`}
          onClick={() => setIsClick((prev) => !prev)}
        />
      )}

      <div
        className={`p-3 flex flex-col gap-2 ${mainHeight ? "text-white" : ""}`}
      >
        <p className="text-sm font-semibold font-[Inter] line-clamp-2">
          {eachVideo.title}
        </p>
        <span className="italic text-xs font-[Inter] mb-5">
          {eachVideo.category}
        </span>
        {!mainHeight && (
          <Link
            to={`/video/${eachVideo.slug}`}
            className="z-10 bottom-[-500px] group-hover:bottom-0 absolute left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-tr-lg rounded-bl-lg font-[Inter] m-3"
          >
            Watch
          </Link>
        )}
      </div>
    </div>
  );
}

export default VideoCard;
