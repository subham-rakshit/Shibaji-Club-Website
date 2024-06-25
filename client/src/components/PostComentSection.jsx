import { Alert, Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import Comment from "./Comment";

function PostComentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentSuccessMsg, setCommentSuccessMsg] = useState(null);
  const [commentErrorMsg, setCommentErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [isShowButton, setIsShowButton] = useState(true);

  // console.log(commentsList);

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
      // console.log(data);
      if (res.ok) {
        setComment("");
        setCommentSuccessMsg(data.message);
        setCommentErrorMsg(null);
        setIsLoading(false);
        setCommentsList((prev) => [data.commentDetails, ...prev]);
        setNumberOfComments((prev) => prev + 1);
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

  useEffect(() => {
    const getPostComments = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/comments/getcomments/${postId}`);
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setCommentsList(data.commentsArray);
          setNumberOfComments(data.totlaComments);
          setIsLoading(false);
        }
        if (data.commentsArray.length < 4) {
          setIsShowButton(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
      }
    };
    getPostComments();
  }, [postId]);

  const handleShowMore = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/comments/getcomments/${postId}?index=${commentsList.length}`
      );
      const data = await res.json();
      if (res.ok) {
        setCommentsList((prev) => [...prev, ...data.commentsArray]);
        setIsLoading(false);
      }
      if (data.commentsArray.length < 4) {
        setIsShowButton(false);
      }
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
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
      {isLoading ? (
        <div className="w-full max-w-[850px] my-5 flex justify-center items-center">
          <PropagateLoader color="gray" size={10} />
        </div>
      ) : commentsList.length === 0 ? (
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:ga-3 my-5">
          <img src="/oops.png" alt="oops" className="w-20 h-20" />
          <p className="font-[Inter] text-sm text-center sm:text-left">
            <span className="text-cyan-500 font-semibold text-lg">Oops!</span>{" "}
            No comments yet. We'd love to hear from you. Please share your
            thoughts
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 my-5">
            <p className="text-sm font-[Inter]">Comments:</p>
            <div className="text-cyan-600 dark:text-cyan-400 px-3 py-1 text-md font-[Inter] border border-gray-600 dark:border-gray-400 rounded-md">
              <p>{numberOfComments}</p>
            </div>
          </div>

          {commentsList.map((eachComment) => (
            <Comment key={eachComment._id} eachComment={eachComment} />
          ))}

          {isShowButton && (
            <button
              type="button"
              className="text-sm font-semibold font-[Inter] w-[fit-content] pl-5 mt-5 text-cyan-500 hover:text-cyan-300"
              onClick={handleShowMore}
            >
              Show more...
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default PostComentSection;