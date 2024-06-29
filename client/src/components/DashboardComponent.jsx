import { Button, Card, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaLongArrowAltUp } from "react-icons/fa";
import { HiUserGroup, HiAnnotation, HiDocumentText } from "react-icons/hi";
import { BiSolidCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BeatLoader, HashLoader } from "react-spinners";
import { toggleSilder } from "../redux-slice/sliderSlice";
import DashToggleButton from "./DashToggleButton";

function DashboardComponent() {
  const [usersList, setUsersList] = useState([]);
  const [postsList, setPostsList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);

  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfComments, setNumberOfComments] = useState(0);

  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const { isSlide } = useSelector((state) => state.slider);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        const userData = await res.json();

        if (res.ok) {
          setUsersList(userData.users);
          setNumberOfUsers(userData.totalUsers);
          setLastMonthUsers(userData.lastMonthUsers);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const getPosts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/post/getposts?limit=5`);
        const postData = await res.json();

        if (res.ok) {
          setPostsList(postData.posts);
          setNumberOfPosts(postData.totalPosts);
          setLastMonthPosts(postData.lastMonthPosts);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const getComments = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/comments/getAllComments?limit=5`);
        const commentData = await res.json();

        if (res.ok) {
          setCommentsList(commentData.comments);
          setNumberOfComments(commentData.totalComments);
          setLastMonthComments(commentData.lastMonthComments);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      getUsers();
      getPosts();
      getComments();
    }
  }, []);
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto px-3 py-5 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 flex-1">
      <div className="w-[900px] md:mx-auto flex flex-col gap-5">
        {/* Toggle Button */}
        <DashToggleButton />
        {/* Toggle Button */}

        {/* Cards */}
        <div className="flex md:justify-center gap-3">
          {/* Total Users Card */}
          <Card className="w-[300px]">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-[16px] font-medium font-[Inter] tracking-tight text-gray-600 dark:text-white mb-1">
                  TOTAL USERS
                </h1>
                {isLoading ? (
                  <BeatLoader size={5} color="#00BCD4" />
                ) : (
                  <p className="text-xl font-[Inter] font-normal text-gray-700 dark:text-gray-400 mb-3">
                    {numberOfUsers}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-[5px]">
                    <FaLongArrowAltUp size="13" color="green" />
                    {isLoading ? (
                      <BeatLoader size={5} color="#00BCD4" />
                    ) : (
                      <span className="text-[12px] font-[inter] text-green-400">
                        {lastMonthUsers}
                      </span>
                    )}
                  </div>
                  <span className="text-[12px] font-[inter] text-gray-500 drak:text-gray-600">
                    Last month
                  </span>
                </div>
              </div>
              <div className="bg-teal-600 rounded-full p-2 h-[fit-content]">
                <HiUserGroup size="25" color="#fff" />
              </div>
            </div>
          </Card>
          {/* Total Users Card */}

          {/* Total Comments Card */}
          <Card className="w-full max-w-[300px]">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-[16px] font-medium font-[Inter] tracking-tight text-gray-600 dark:text-white mb-1">
                  TOTAL COMMENTS
                </h1>
                {isLoading ? (
                  <BeatLoader size={5} color="#00BCD4" />
                ) : (
                  <p className="text-xl font-[Inter] font-normal text-gray-700 dark:text-gray-400 mb-3">
                    {numberOfComments}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-[5px]">
                    <FaLongArrowAltUp size="13" color="green" />
                    {isLoading ? (
                      <BeatLoader size={5} color="#00BCD4" />
                    ) : (
                      <span className="text-[12px] font-[inter] text-green-400">
                        {lastMonthComments}
                      </span>
                    )}
                  </div>
                  <span className="text-[12px] font-[inter] text-gray-500 drak:text-gray-600">
                    Last month
                  </span>
                </div>
              </div>
              <div className="bg-violet-600 rounded-full p-2 h-[fit-content]">
                <HiAnnotation size="25" color="#fff" />
              </div>
            </div>
          </Card>
          {/* Total Comments Card */}

          {/* Total Posts Card */}
          <Card className="w-full max-w-[300px]">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-[16px] font-medium font-[Inter] tracking-tight text-gray-600 dark:text-white mb-1">
                  TOTAL POSTS
                </h1>
                {isLoading ? (
                  <BeatLoader size={5} color="#00BCD4" />
                ) : (
                  <p className="text-xl font-[Inter] font-normal text-gray-700 dark:text-gray-400 mb-3">
                    {numberOfPosts}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-[5px]">
                    <FaLongArrowAltUp size="13" color="green" />
                    {isLoading ? (
                      <BeatLoader size={5} color="#00BCD4" />
                    ) : (
                      <span className="text-[12px] font-[inter] text-green-400">
                        {lastMonthPosts}
                      </span>
                    )}
                  </div>
                  <span className="text-[12px] font-[inter] text-gray-500 drak:text-gray-600">
                    Last month
                  </span>
                </div>
              </div>
              <div className="bg-green-400 rounded-full p-2 h-[fit-content]">
                <HiDocumentText size="25" color="#fff" />
              </div>
            </div>
          </Card>
          {/* Total Posts Card */}
        </div>
        {/* Cards */}

        {/* Users, Comments, Posts details */}
        <div
          className={`w-[850px] md:mx-auto flex flex-col gap-5 ${
            isLoading && "justify-center items-center h-[500px]"
          }`}
        >
          {isLoading ? (
            <HashLoader size={50} color="#00BCD4" />
          ) : (
            <>
              {/* Users and Comments details */}
              <div className="flex items-center md:justify-center gap-3">
                {/* Users details */}
                <div className="px-3 py-5 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 justify-between mb-5">
                    <p className="font-[Inter] text-sm font-medium">
                      Registered Users
                    </p>
                    <Link to="/admin-dashboard?tab=users">
                      <Button
                        type="button"
                        gradientDuoTone="purpleToPink"
                        outline
                        size="xs"
                        className="font-[Inter]"
                      >
                        See All
                      </Button>
                    </Link>
                  </div>

                  <Table hoverable className="font-[Inter] h-[500px]">
                    <Table.Head className="text-[12px]">
                      <Table.HeadCell>User Image</Table.HeadCell>
                      <Table.HeadCell>Username</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="text-[13px] font-medium">
                      {usersList.map((user, i) => (
                        <Table.Row
                          className={`bg-white dark:bg-gray-800 ${
                            i === usersList.length - 1
                              ? ""
                              : "border-gray-200 border-b-2 dark:border-gray-700"
                          }`}
                          key={user._id}
                        >
                          <Table.Cell>
                            <img
                              src={user.profilePicture}
                              alt={user.username}
                              className="w-7 h-7 rounded-full bg-gray-500 object-cover"
                            />
                          </Table.Cell>

                          <Table.Cell className="text-xs">
                            {user.username}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
                {/* Users details */}

                {/* Comments details */}
                <div className="px-3 py-5 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 justify-between mb-5">
                    <p className="font-[Inter] text-sm font-medium">
                      User Comments
                    </p>
                    <Link to="/admin-dashboard?tab=comments">
                      <Button
                        type="button"
                        gradientDuoTone="purpleToPink"
                        outline
                        size="xs"
                        className="font-[Inter]"
                      >
                        See All
                      </Button>
                    </Link>
                  </div>
                  <Table hoverable className="font-[Inter] h-[500px]">
                    <Table.Head className="text-[12px]">
                      <Table.HeadCell>Comment Content</Table.HeadCell>
                      <Table.HeadCell>Likes</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="text-[13px] font-medium">
                      {commentsList.map((comment, i) => (
                        <Table.Row
                          className={`bg-white dark:bg-gray-800 ${
                            i === commentsList.length - 1
                              ? ""
                              : "border-gray-200 border-b-2 dark:border-gray-700"
                          }`}
                          key={comment._id}
                        >
                          <Table.Cell>
                            {comment.comment.slice(0, 50) + "..."}
                          </Table.Cell>

                          <Table.Cell className="text-xs">
                            {comment.numberOfLikes}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
                {/* Comments details */}
              </div>
              {/* Users and Comments details */}

              {/* User's Posts details */}
              <div className="w-[80%] md:mx-auto px-3 py-5 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 justify-between mb-5">
                  <p className="font-[Inter] text-sm font-medium">
                    Bolg Details
                  </p>
                  <Link to="/admin-dashboard?tab=posts">
                    <Button
                      type="button"
                      gradientDuoTone="purpleToPink"
                      outline
                      size="xs"
                      className="font-[Inter]"
                    >
                      See All
                    </Button>
                  </Link>
                </div>
                <Table hoverable className="font-[Inter] h-[500px]">
                  <Table.Head className="text-[12px]">
                    <Table.HeadCell>Post Image</Table.HeadCell>
                    <Table.HeadCell>Post Tilte</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                  </Table.Head>

                  <Table.Body className="text-[13px] font-medium">
                    {postsList.map((post, i) => (
                      <Table.Row
                        className={`bg-white dark:bg-gray-800 ${
                          i === postsList.length - 1
                            ? ""
                            : "border-gray-200 border-b-2 dark:border-gray-700"
                        }`}
                        key={post._id}
                      >
                        <Table.Cell>
                          <img
                            src={post.blogImage}
                            alt="bolg image"
                            className="w-32 h-14 rounded-md bg-gray-500 object-cover"
                          />
                        </Table.Cell>

                        <Table.Cell className="text-xs">
                          {post.title}
                        </Table.Cell>

                        <Table.Cell className="text-[13px]">
                          {post.category}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
              {/* User's Posts details */}
            </>
          )}
        </div>
        {/* Users, Comments, Posts details */}
      </div>
    </div>
  );
}

export default DashboardComponent;
