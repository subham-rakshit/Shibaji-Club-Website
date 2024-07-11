import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

function Comment({ eachComment, onLikeClick, onEditClick, onDeleteClick }) {
  const [userInfo, setUserInfo] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCommentText, setEditedCommentText] = useState(
    eachComment.comment
  );

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

  const handleEditComment = async () => {
    setIsEditing(true);
    setEditedCommentText(eachComment.comment);
  };

  const handleEditSave = async () => {
    if (editedCommentText === eachComment.comment) {
      return alert("Nothing to be edited!");
    }
    try {
      const res = await fetch(`/api/comments/editComment/${eachComment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: editedCommentText }),
      });
      const data = await res.json();

      if (res.ok) {
        onEditClick(data);
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-start gap-4 mb-5 border-b border-b-gray-300 pb-3 dark:border-opacity-[0.1]">
      <div>
        <img
          src={
            userInfo.profilePicture
              ? userInfo.profilePicture
              : "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
          }
          alt={userInfo.username ? userInfo.username : "anonymous user image"}
          className="w-10 h-10 object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <span className="font-bold font-[Inter] mr-1 text-xs truncate">
            {userInfo.username ? `@${userInfo.username}` : "anonymous user"}
          </span>
          <span className="font-[Inter] italic text-[12px] text-gray-600 dark:text-gray-300">
            {moment(eachComment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              value={editedCommentText}
              className="w-full"
              onChange={(e) => setEditedCommentText(e.target.value)}
              required
            />
            <div className="font-[Inter] text-xs flex items-center justify-end gap-2">
              <Button
                gradientDuoTone="purpleToPink"
                size="xs"
                onClick={handleEditSave}
              >
                Save
              </Button>
              <Button
                gradientDuoTone="purpleToBlue"
                outline
                size="xs"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="font-[Inter] text-sm font-base text-gray-600 dark:text-gray-500">
              {eachComment.comment}
            </p>
            <div className="flex items-center gap-3 text-[14px] text-gray-600 dark:text-gray-500 font-[Inter] font-normal">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`text-gray-400 hover:text-blue-500 text-sm ${
                    currentUser &&
                    eachComment.likes.includes(currentUser._id) &&
                    "!text-blue-500 !hover:text-blue-700"
                  }`}
                  onClick={() => onLikeClick(eachComment._id)}
                >
                  <FaThumbsUp />
                </button>
                {eachComment.numberOfLikes > 0 && (
                  <p className="text-gray-400 font-[Inter] text-[12px] font-medium">
                    {eachComment.numberOfLikes > 0 &&
                      eachComment.numberOfLikes +
                        " " +
                        (eachComment.numberOfLikes === 1 ? "like" : "likes")}
                  </p>
                )}
              </div>
              {currentUser &&
                (currentUser._id === eachComment.userId ||
                  currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-teal-400"
                      onClick={handleEditComment}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-red-600"
                      onClick={() => onDeleteClick(eachComment._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;
