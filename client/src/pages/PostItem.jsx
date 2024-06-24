import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { Button } from "flowbite-react";
import { PostComentSection } from "../components";

function PostItem() {
  const { postSlug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetcheError] = useState(false);
  const [fetchPostDetails, setFetchPostDetails] = useState(null);

  console.log(fetchPostDetails);

  useEffect(() => {
    console.log(postSlug);
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
            to={`/search?category=${
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
        <PostComentSection postId={fetchPostDetails && fetchPostDetails._id} />
      </div>
    </main>
  );
}

export default PostItem;
