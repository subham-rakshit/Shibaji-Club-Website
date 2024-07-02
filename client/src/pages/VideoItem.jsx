import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { Button } from "flowbite-react";
import { PostCard, PostCommentSection } from "../components";
import { PiImageBrokenDuotone } from "react-icons/pi";

function VideoItem() {
  const { videoSlug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [fetchVideoDetails, setFetchVideoDetails] = useState(null);
  const [recentlyAddedVideo, setRecentlyAddedVideo] = useState(null);

  useEffect(() => {
    const getPostFetchDetails = async () => {
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
    getPostFetchDetails();
  }, [videoSlug]);

  useEffect(() => {
    const getRecentPosts = async () => {
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
    getRecentPosts();
  }, [videoSlug]);

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
            to={`/search?category=${
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
        <img
          src={fetchVideoDetails && fetchVideoDetails.thumbnailURL}
          alt={fetchVideoDetails && fetchVideoDetails.title}
          className="w-full max-w-[900px] max-h-[500px] object-cover mt-5 lg:mt-8 rounded-md lg:rounded-2xl"
        />
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

        <PostCommentSection
          postId={fetchVideoDetails && fetchVideoDetails._id}
        />

        <div className="flex flex-col items-center my-5 w-full">
          <h1 className="font-[Inter] text-sm sm:text-base font-medium text-gray-40">
            Recent Videos
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
          ) : // <div className="flex justify-center items-center gap-2 flex-wrap mt-5">
          //   {recentlyAddedPost.map((post) => (
          //     <PostCard eachPost={post} key={post._id} />
          //   ))}
          // </div>
          null}
        </div>
      </div>
    </main>
  );
}

export default VideoItem;
