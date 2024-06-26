import { Table } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function DashCommentUserDetails({ eachComment }) {
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
          <Link to={`/post/${info && info.commentedPost.slug}`}>
            <img
              src={info && info.commentedPost.blogImage}
              alt="post image"
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
