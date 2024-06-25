import React, { useEffect, useState } from "react";
import moment from "moment";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";

function Comment({ eachComment }) {
  const [userInfo, setUserInfo] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  //   console.log("User info: ", userInfo);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${eachComment.userId}`);
        const data = await res.json();

        if (res.ok) {
          setUserInfo(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserInfo();
  }, [eachComment]);

  return (
    <div className="flex items-start gap-4 mb-5 border-b border-b-gray-300 pb-3 dark:border-opacity-[0.1]">
      <div>
        <img
          src={userInfo.profilePicture && userInfo.profilePicture}
          alt={userInfo.username && userInfo.username}
          className="w-10 h-10 object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <span className="font-bold font-[Inter] mr-2 text-xs truncate">
            {userInfo.username ? `@${userInfo.username}` : "anonymous user"}
          </span>
          <span className="font-[Inter] italic text-[12px] text-gray-600 dark:text-gray-300">
            {moment(eachComment.updatedAt).fromNow()}
          </span>
        </div>
        <p className="font-[Inter] text-sm font-base text-gray-600 dark:text-gray-500 border-b border-b-gray-600 dark:border-b-gray-400 w-[fit-content]">
          {eachComment.comment}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-500 font-[Inter] font-normal">
          <AiFillLike />
          {currentUser && currentUser._id === eachComment.userId && (
            <>
              <span className="hover:text-teal-400 hover:cursor-pointer hover:underline">
                Edit
              </span>
              <span className="hover:text-red-400 hover:cursor-pointer hover:underline">
                Delete
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
