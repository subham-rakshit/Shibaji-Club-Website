import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Modal } from "flowbite-react";
import { IoImagesSharp } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { PacmanLoader } from "react-spinners";
import DashCommentUserDetails from "./DashCommentUserDetails";
import DashToggleButton from "./DashToggleButton";

function DashComment() {
  const { currentUser } = useSelector((state) => state.user);
  const [allCommentsData, setAllCommentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreData, setShowMoreData] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  //* Fetch All data when ever admin user is changed -->
  useEffect(() => {
    setIsLoading(true);
    const getCommentsDetails = async () => {
      try {
        const res = await fetch(`/api/comments/getAllComments`);
        const data = await res.json();

        if (res.ok) {
          setAllCommentsData(data.comments);
          setIsLoading(false);
          if (data.comments.length < 9) {
            setShowMoreData(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      getCommentsDetails();
    }
  }, [currentUser._id]);

  //* Show more btn functionality -->
  const handleShowMore = async () => {
    const startIndex = allCommentsData.length;
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/comments/getAllComments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setAllCommentsData((prev) => [...prev, ...data.comments]);
        setIsLoading(false);
        if (data.comments.length < 9) {
          setShowMoreData(false);
        }
      } else {
        console.log(data.extraDetails);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //* Delete a post functionality -->
  const handleDeleteComment = async (e) => {
    setShowModel(false);
    try {
      const res = await fetch(
        `/api/comments/deleteComment/${selectedCommentId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setAllCommentsData((prev) =>
          prev.filter((comment) => comment._id !== selectedCommentId)
        );
        alert(data.message);
      } else {
        console.log(data.extraDetails);
        alert(data.extraDetails);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`table-auto overflow-x-scroll md:mx-auto px-3 py-5 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 flex-1 ${
        allCommentsData.length === 0 || isLoading === true
          ? "flex flex-col justify-center"
          : ""
      }`}
    >
      {isLoading ? (
        <PacmanLoader color="#36d7b7" className="mx-auto" />
      ) : currentUser.isAdmin && allCommentsData.length > 0 ? (
        <div className="overflow-x-auto w-[950px] mx-auto flex flex-col gap-5">
          {/* Toggle Button */}
          <DashToggleButton />

          <Table hoverable className="shadow-md font-[Inter]">
            <Table.Head className="text-[14px]">
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="text-[13px] font-medium">
              {allCommentsData.map((comment, i) => {
                // console.log("Each comment", comment.userId, comment.postId);
                return (
                  <Table.Row
                    className={`bg-white dark:bg-gray-800 ${
                      i === allCommentsData.length - 1
                        ? ""
                        : "border-gray-200 border-b-2 dark:border-gray-700"
                    }`}
                    key={comment._id}
                  >
                    <Table.Cell className="whitespace-nowrap text-gray-700 dark:text-gray-300 text-[14px]">
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </Table.Cell>

                    <Table.Cell className="text-[10px]">
                      {comment.comment}
                    </Table.Cell>

                    <Table.Cell className="font-bold text-black dark:text-gray-200">
                      {comment.numberOfLikes}
                    </Table.Cell>

                    <DashCommentUserDetails eachComment={comment} />

                    <Table.Cell>
                      <span
                        className="text-red-600 hover:underline dark:text-red-500 cursor-pointer"
                        onClick={() => {
                          setShowModel(true);
                          setSelectedCommentId(comment._id);
                        }}
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          {showMoreData && (
            <button
              type="button"
              className="w-full text-teal-500 hover:text-green-500 self-center text-sm py-5 font-[Inter] font-semibold hover:font-extrabold"
              onClick={handleShowMore}
            >
              Show more...
            </button>
          )}
        </div>
      ) : (
        <>
          <IoImagesSharp size="100" className="mx-auto mb-10" />
          <h1 className="text-gray-500 dark:text-gray-300 text-2xl font-bold font-[Inter] text-center">
            Oops! No Comments to show
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-xs font-normal font-[Inter] text-center mt-2">
            Currently, there are no comments available to display. Please check
            back later for updates.
          </p>
        </>
      )}
      <Modal
        show={showModel}
        size="md"
        onClose={() => setShowModel(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to remove this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModel(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashComment;
