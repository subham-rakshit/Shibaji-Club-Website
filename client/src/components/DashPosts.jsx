import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Modal } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { IoImagesSharp } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { PacmanLoader } from "react-spinners";

function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [allPostsData, setAllPostsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreData, setShowMoreData] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const navigate = useNavigate();

  //* Fetch All data when ever admin user is changed -->
  useEffect(() => {
    setIsLoading(true);
    const getPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();

        if (res.ok) {
          setAllPostsData(data.posts);
          setIsLoading(false);
          if (data.posts.length < 9) {
            setShowMoreData(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      getPosts();
    }
  }, [currentUser._id]);

  //* Show more btn functionality -->
  const handleShowMore = async () => {
    const startIndex = allPostsData.length;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setAllPostsData((prev) => [...prev, ...data.posts]);
        setIsLoading(false);
        if (data.posts.length < 9) {
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
  const handleDeletePost = async () => {
    setShowModel(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${selectedPostId}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setAllPostsData((prev) =>
          prev.filter((post) => post._id !== selectedPostId)
        );
        console.log(data.message);
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
      className={`table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 flex-1 ${
        allPostsData.length === 0 || isLoading === true
          ? "flex flex-col justify-center"
          : ""
      }`}
    >
      {isLoading ? (
        <PacmanLoader color="#36d7b7" className="mx-auto" />
      ) : currentUser.isAdmin && allPostsData.length > 0 ? (
        <div className="overflow-x-auto w-[1024px] mx-auto">
          <Table hoverable className="shadow-md font-[Inter]">
            <Table.Head className="text-[14px]">
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="text-sm font-medium">
              {allPostsData.map((eachPost, i) => (
                <Table.Row
                  className={`bg-white dark:bg-gray-800 ${
                    i === allPostsData.length - 1
                      ? ""
                      : "border-gray-200 border-b-2 dark:border-gray-700"
                  }`}
                  key={eachPost._id}
                >
                  <Table.Cell className="whitespace-nowrap text-gray-500 dark:text-gray-300">
                    {new Date(eachPost.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${eachPost.slug}`}>
                      <img
                        src={eachPost.blogImage}
                        alt={eachPost.title}
                        className="w-20 h-10 object-cover bg-gray-500 rounded-sm"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="hover:underline hover:text-blue-400 text-xs line-clamp-1"
                      to={`/post/${eachPost.slug}`}
                    >
                      {eachPost.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="text-xs">
                    {eachPost.category}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className="text-red-600 hover:underline dark:text-red-500 cursor-pointer"
                      onClick={() => {
                        setShowModel(true);
                        setSelectedPostId(eachPost._id);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${eachPost._id}`}>
                      <span className="text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">
                        Edit
                      </span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
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
            Oops! No posts to show
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-xs font-normal font-[Inter] text-center mt-2">
            You haven't created any posts yet. Don't miss out—start creating
            your first post now and share your thoughts with the community!
          </p>
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            outline
            className="font-[Inter] w-[fit-content] mx-auto mt-5"
            onClick={() => navigate("/create-post")}
          >
            Create posts
          </Button>
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
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                {"Yes, I'm sure"}
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

export default DashPosts;
