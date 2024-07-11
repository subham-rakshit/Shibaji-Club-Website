import { Table } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function DashCommentUserDetails({ eachComment }) {
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(info);

  useState(() => {
    setIsLoading(true);
    const getUserandPostInfo = async () => {
      try {
        const res = await fetch(
          `/api/comments/getUserAndPostDetails/${eachComment.userId}/${eachComment.postId}`
        );
        const data = await res.json();
        if (res.ok) {
          setInfo(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    getUserandPostInfo();
  }, [eachComment]);
  return (
    <>
      <Table.Cell>
        {isLoading ? (
          <BeatLoader size={5} color="#00BCD4" />
        ) : (
          <Link
            to={`/${info && (info.commentedPost ? "post" : "video")}/${
              info &&
              (info.commentedPost
                ? info.commentedPost.slug
                : info.commentedVideo.slug)
            }`}
          >
            <img
              src={
                info &&
                (info.commentedPost
                  ? info.commentedPost.blogImage
                  : info.commentedVideo.thumbnailURL)
              }
              alt={
                info && (info.commentedPost ? "blog image" : "video thumbnail")
              }
              className="w-60 h-12 object-cover bg-gray-500 rounded-lg"
            />
          </Link>
        )}
      </Table.Cell>

      <Table.Cell>
        {isLoading ? (
          <BeatLoader size={5} color="#00BCD4" />
        ) : (
          <>
            <img
              src={info && info.commentedUser.profilePicture}
              alt={info && info.commentedUser.username}
              className="w-5 h-5 object-cover bg-gray-500 rounded-full"
            />
            <p>{info && info.commentedUser.username}</p>
          </>
        )}
      </Table.Cell>
    </>
  );
}

export default DashCommentUserDetails;
