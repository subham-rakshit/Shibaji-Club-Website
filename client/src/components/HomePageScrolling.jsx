import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

function HomePageScrolling() {
  const [allVideos, setAllVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await fetch("/api/video/getvideos?order=desc");
        if (res.ok) {
          const data = await res.json();
          setAllVideos(data.videos || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getVideos();
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap main-slide-container">
      <div className="animate-slide flex items-center gap-2">
        {allVideos.slice(0, 6).map((item, i) => (
          <div key={item._id + i}>
            <VideoCard
              eachVideo={item}
              mainHeight="h-[300px]"
              imageHeight="h-[160px]"
            />
          </div>
        ))}
      </div>
      <div className="animate-slide flex items-center gap-2 ml-2">
        {allVideos.slice(0, 6).map((item, i) => (
          <div key={item._id + i}>
            <VideoCard
              eachVideo={item}
              mainHeight="h-[300px]"
              imageHeight="h-[160px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePageScrolling;
