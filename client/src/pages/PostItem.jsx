import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { Button } from "flowbite-react";
import { PostCard, PostCommentSection } from "../components";
import { PiImageBrokenDuotone } from "react-icons/pi";

function PostItem() {
  const { postSlug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetcheError] = useState(false);
  const [fetchPostDetails, setFetchPostDetails] = useState(null);
  const [recentlyAddedPost, setRecentlyAddedPost] = useState(null);

  useEffect(() => {
    const getPostFetchDetails = async () => {
      try {
        setIsLoading(true);
        setFetcheError(false);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setFetcheError(true);
          setIsLoading(false);
          return;
        }
        if (res.ok) {
          setFetchPostDetails(data.posts[0]);
          setIsLoading(false);
          setFetcheError(false);
        }
      } catch (error) {
        setFetcheError(true);
        setIsLoading(false);
        console.log(error.message);
      }
    };
    getPostFetchDetails();
  }, [postSlug]);

  useEffect(() => {
    const getRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getRecentPosts`);
        const data = await res.json();
        if (res.ok) {
          setRecentlyAddedPost(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getRecentPosts();
  }, [postSlug]);

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
          {fetchPostDetails && fetchPostDetails.title}
        </h1>
        {fetchPostDetails && (
          <Link
            to={`/search?tab=blogs&category=${
              fetchPostDetails && fetchPostDetails.category
            }`}
          >
            <Button
              color="gray"
              size="xs"
              pill
              className="text-xs font-[Inter] mt-5 lg:mt-8"
            >
              {fetchPostDetails.category}
            </Button>
          </Link>
        )}
        <img
          src={fetchPostDetails && fetchPostDetails.blogImage}
          alt={fetchPostDetails && fetchPostDetails.title}
          className="w-full max-w-[900px] max-h-[500px] object-cover mt-5 lg:mt-8 rounded-md lg:rounded-2xl"
        />
        <div className="w-full max-w-[900px] flex justify-between text-[12px] font-[Inter] font-semibold px-2 pt-2 pb-4 dark:text-gray-500 border-b border-gray-300 dark:border-gray-600">
          <span>
            {fetchPostDetails &&
              new Date(fetchPostDetails.createdAt).toLocaleDateString()}
          </span>
          <span className="italic">
            {fetchPostDetails &&
              `${(fetchPostDetails.content.length / 1000).toFixed(
                0
              )} min to read`}
          </span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: fetchPostDetails && fetchPostDetails.content,
          }}
          className="w-full max-w-[850px] mt-5 post-item-content-style"
        ></div>

        <PostCommentSection postId={fetchPostDetails && fetchPostDetails._id} />

        <div className="flex flex-col items-center my-5 w-full">
          <h1 className="font-[Inter] text-sm sm:text-base font-medium text-gray-40">
            More Posts
          </h1>
          {!recentlyAddedPost ? (
            <div className="flex flex-col items-center my-5">
              <PiImageBrokenDuotone size="100" className="text-gray-400" />
              <h1 className="text-base sm:text-lg text-gray-400 font-bold font-[Inter] text-center mt-5">
                Please check back later for more updates!
              </h1>
              <p className="text-xs font-[inter] text-gray-400 text-center mt-3 italic">
                Explore our repository of fresh content, curated to inform,
                entertain, and inspire you with every visit.
              </p>
              <Link to="/search?tab=blogs">
                <Button
                  type="button"
                  gradientDuoTone="purpleToBlue"
                  outline
                  size="xs"
                  className="font-[Inter] mt-5"
                >
                  More bolgs
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2 flex-wrap mt-5">
              {recentlyAddedPost.map((post) => (
                <PostCard eachPost={post} key={post._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default PostItem;
