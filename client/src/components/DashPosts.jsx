import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { IoImagesSharp } from "react-icons/io5";
import { PacmanLoader } from "react-spinners";

function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [allPostsData, setAllPostsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const getPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setAllPostsData(data.posts);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      getPosts();
    }
  }, [currentUser._id]);

  return (
    <div
      className={`table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ${
        allPostsData.length === 0 && "flex flex-col justify-center"
      } flex-1`}
    >
      {isLoading ? (
        <PacmanLoader color="#36d7b7" className="mx-auto" />
      ) : currentUser.isAdmin && allPostsData.length > 0 ? (
        <>
          <Table hoverable className="shadow-md font-[Inter]">
            <Table.Head>
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
                      className="hover:underline hover:text-blue-400 text-xs"
                      to={`/post/${eachPost.slug}`}
                    >
                      {eachPost.title.length > 20
                        ? eachPost.title.substring(0, 15) + "..."
                        : eachPost.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="text-xs">
                    {eachPost.category}
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-red-600 hover:underline dark:text-red-500 cursor-pointer">
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
        </>
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
    </div>
  );
}

export default DashPosts;
