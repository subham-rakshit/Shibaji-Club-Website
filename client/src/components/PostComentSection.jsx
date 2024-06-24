import { Alert, Button, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function PostComentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentSuccessMsg, setCommentSuccessMsg] = useState(null);
  const [commentErrorMsg, setCommentErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      setCommentSuccessMsg(null);
      setCommentErrorMsg("Comment must be at least 200 characters.");
      return;
    }
    try {
      setCommentErrorMsg(null);
      setCommentSuccessMsg(null);
      setIsLoading(true);
      const res = await fetch(`/api/comments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, postId, userId: currentUser._id }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setComment("");
        setCommentSuccessMsg(data.message);
        setCommentErrorMsg(null);
        setIsLoading(false);
      }
      if (!res.ok) {
        setCommentSuccessMsg(null);
        setCommentErrorMsg(data.extraDetails);
        setIsLoading(false);
      }
    } catch (error) {
      setCommentErrorMsg(error.message);
      setCommentSuccessMsg(null);
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div className="w-full max-w-[850px] my-5">
      {currentUser ? (
        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 font-[Inter] font-[500]">
          <p className="mr-2">Sign in as:</p>
          <img
            src={currentUser && currentUser.profilePicture}
            alt={currentUser && currentUser.username}
            className="w-5 h-5 object-cover rounded-full mr-1"
          />
          <Link
            className="text-cyan-500 hover:underline"
            to="/admin-dashboard?tab=profile"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex items-center text-xs text-teal-600 dark:text-gray-400 font-[Inter] font-[600]">
          <p className="mr-2">Log in to share your comment:</p>
          <Link className="text-cyan-500 hover:underline font-bold" to="/login">
            Login
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleFormSubmit}
          className="mt-3 border-2 border-cyan-500 border-dashed p-3 rounded-tl-xl rounded-br-xl"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="5"
            maxLength="200"
            className="text-xs font-[Inter]"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            required
          />
          <div className="flex items-center justify-between gap-2 mt-3">
            <p className="text-xs text-gray-400 dark:text-gray-600 font-[400] italic">
              {200 - comment.length} characters remaining
            </p>
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              outline
              size="xs"
              className="font-[Inter]"
              disabled={isLoading}
            >
              Submit
            </Button>
          </div>
          {commentSuccessMsg && (
            <Alert
              color="success"
              className="mt-3"
              onDismiss={() => setCommentSuccessMsg(null)}
            >
              {commentSuccessMsg}
            </Alert>
          )}
          {commentErrorMsg && (
            <Alert
              color="failure"
              className="mt-3"
              onDismiss={() => setCommentErrorMsg(null)}
            >
              {commentErrorMsg}
            </Alert>
          )}
        </form>
      )}
    </div>
  );
}

export default PostComentSection;
