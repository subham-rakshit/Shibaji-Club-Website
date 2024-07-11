import { Button, Card, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaComments, FaLongArrowAltUp, FaUsersCog } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BeatLoader, HashLoader, PacmanLoader } from "react-spinners";
import DashToggleButton from "./DashToggleButton";
import { FaCheckToSlot, FaFaceSadTear } from "react-icons/fa6";
import { BiSolidVideos } from "react-icons/bi";

function DashboardComponent() {
  const [usersList, setUsersList] = useState([]);
  const [postsList, setPostsList] = useState([]);
  const [videosList, setVideosList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [trialsList, setTrialsList] = useState([]);

  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfVideos, setNumberOfVideos] = useState(0);
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [numberOfTrials, setNumberOfTrials] = useState(0);

  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthVideos, setLastMonthVideos] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthTrials, setLastMonthTrials] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/user/getusers?limit=5`);
        const userData = await res.json();

        if (res.ok) {
          setUsersList(userData.users);
          setNumberOfUsers(userData.totalUsers);
          setLastMonthUsers(userData.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
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
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    const getVideos = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/video/getvideos?limit=5`);
        const videoData = await res.json();

        if (res.ok) {
          setVideosList(videoData.videos);
          setNumberOfVideos(videoData.totalVideos);
          setLastMonthVideos(videoData.lastMonthVideos);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
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
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    const getTrials = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/trial/get-trials-data?limit=5`);
        const trialData = await res.json();

        if (res.ok) {
          setTrialsList(trialData.trials);
          setNumberOfTrials(trialData.totalTrials);
          setLastMonthTrials(trialData.lastMonthTrials);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser.isAdmin) {
      getUsers();
      getPosts();
      getVideos();
      getComments();
      getTrials();
    }
  }, []);

  //* Age calculation before till date -->
  const calculateAge = (dob) => {
    const [year, month, day] = dob.split("-").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div
      className={`table-auto overflow-x-scroll md:mx-auto px-3 py-5 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 flex-1 ${
        isLoading === true ? "flex flex-col justify-center" : ""
      }`}
    >
      {isLoading ? (
        <PacmanLoader color="#36d7b7" className="mx-auto" />
      ) : (
        <div className="w-[900px] md:mx-auto flex flex-col gap-5">
          {/* Toggle Button */}
          <DashToggleButton />
          {/* Toggle Button */}

          {/* Cards */}
          <div className="flex items-center flex-wrap gap-3">
            {/* Total Users Card */}
            <Card className="w-full max-w-[280px]">
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
                  <FaUsersCog size="25" color="#fff" />
                </div>
              </div>
            </Card>
            {/* Total Users Card */}

            {/* Total Comments Card */}
            <Card className="w-full max-w-[280px]">
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
                  <FaComments size="25" color="#fff" />
                </div>
              </div>
            </Card>
            {/* Total Comments Card */}

            {/* Total Posts Card */}
            <Card className="w-full max-w-[280px]">
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

            {/* Total Videos Card */}
            <Card className="w-full max-w-[280px]">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h1 className="text-[16px] font-medium font-[Inter] tracking-tight text-gray-600 dark:text-white mb-1">
                    TOTAL VIDEOS
                  </h1>
                  {isLoading ? (
                    <BeatLoader size={5} color="#00BCD4" />
                  ) : (
                    <p className="text-xl font-[Inter] font-normal text-gray-700 dark:text-gray-400 mb-3">
                      {numberOfVideos}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-[5px]">
                      <FaLongArrowAltUp size="13" color="green" />
                      {isLoading ? (
                        <BeatLoader size={5} color="#00BCD4" />
                      ) : (
                        <span className="text-[12px] font-[inter] text-green-400">
                          {lastMonthVideos}
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] font-[inter] text-gray-500 drak:text-gray-600">
                      Last month
                    </span>
                  </div>
                </div>
                <div className="bg-[#94C120] rounded-full p-2 h-[fit-content]">
                  <BiSolidVideos size="25" color="#fff" />
                </div>
              </div>
            </Card>
            {/* Total Videos Card */}

            {/* Total Booked Trails Card */}
            <Card className="w-full max-w-[280px]">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h1 className="text-[16px] font-medium font-[Inter] tracking-tight text-gray-600 dark:text-white mb-1">
                    BOOKED TRIALS
                  </h1>
                  {isLoading ? (
                    <BeatLoader size={5} color="#00BCD4" />
                  ) : (
                    <p className="text-xl font-[Inter] font-normal text-gray-700 dark:text-gray-400 mb-3">
                      {numberOfTrials}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-[5px]">
                      <FaLongArrowAltUp size="13" color="green" />
                      {isLoading ? (
                        <BeatLoader size={5} color="#00BCD4" />
                      ) : (
                        <span className="text-[12px] font-[inter] text-green-400">
                          {lastMonthTrials}
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] font-[inter] text-gray-500 drak:text-gray-600">
                      Last month
                    </span>
                  </div>
                </div>
                <div className="bg-[#94C120] rounded-full p-2 h-[fit-content]">
                  <FaCheckToSlot size="25" color="#fff" />
                </div>
              </div>
            </Card>
            {/* Total Booked Trails Card */}
          </div>
          {/* Cards */}

          {/* Users, Comments, Posts, Videos, Trials details */}
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
                  <div className="px-3 py-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-custom-light-dark min-w-[300px]">
                    <div className="flex items-center gap-2 justify-between mb-5">
                      <p className="font-[Inter] text-sm font-medium">
                        Recent Users
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
                    {usersList.length > 0 ? (
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
                    ) : (
                      <div className="w-[300px] h-[500px] flex flex-col items-center justify-center">
                        <FaFaceSadTear size="60" />
                        <p className="text-xs text-center mt-5 mb-2 font-[Inter] font-semibold">
                          Oops! There are no registered users.
                        </p>
                        <p className="text-[12px] text-center font-[Inter]">
                          Please monitor and promote user registrations.
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Users details */}

                  {/* Comments details */}
                  <div className="px-3 py-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-custom-light-dark min-w-[450px]">
                    <div className="flex items-center gap-2 justify-between mb-5">
                      <p className="font-[Inter] text-sm font-medium">
                        Recent Comments
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
                    {commentsList.length > 0 ? (
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
                    ) : (
                      <div className="w-[450px] h-[500px] flex flex-col items-center justify-center">
                        <FaFaceSadTear size="60" />
                        <p className="text-xs text-center mt-5 mb-2 font-[Inter] font-semibold">
                          Oops! There are no comments yet.
                        </p>
                        <p className="text-[12px] text-center font-[Inter]">
                          Please encourage users to engage by leaving comments.
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Comments details */}
                </div>
                {/* Users and Comments details */}

                {/* User's Blog details */}
                <div className="w-[80%] md:mx-auto px-3 py-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-custom-light-dark">
                  <div className="flex items-center gap-2 justify-between mb-5">
                    <p className="font-[Inter] text-sm font-medium">
                      Recent Blogs
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
                  {postsList.length > 0 ? (
                    <Table hoverable className="font-[Inter] h-[fit-content]">
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

                            <Table.Cell>{post.title}</Table.Cell>

                            <Table.Cell>{post.category}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  ) : (
                    <div className="w-full h-[400px] flex flex-col items-center justify-center">
                      <FaFaceSadTear size="60" />
                      <p className="text-sm text-center mt-5 mb-2 font-[Inter] font-semibold">
                        Oops! There are no blog posts yet.
                      </p>
                      <p className="text-[13px] text-center font-[Inter]">
                        Please create and publish new blog posts to engage your
                        audience.
                      </p>
                    </div>
                  )}
                </div>
                {/* User's Blog details */}

                {/* User's Videos details */}
                <div className="w-[850px] md:mx-auto px-3 py-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-custom-light-dark">
                  <div className="flex items-center gap-2 justify-between mb-5">
                    <p className="font-[Inter] text-sm font-medium">
                      Recent Videos
                    </p>
                    <Link to="/admin-dashboard?tab=videos">
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
                  {videosList.length > 0 ? (
                    <Table hoverable className="font-[Inter] h-[fit-content]">
                      <Table.Head className="text-[12px]">
                        <Table.HeadCell>Video Thumbnail</Table.HeadCell>
                        <Table.HeadCell>Video Tilte</Table.HeadCell>
                        <Table.HeadCell>Video Duration</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                      </Table.Head>

                      <Table.Body className="text-[13px] font-medium">
                        {videosList.map((video, i) => (
                          <Table.Row
                            className={`bg-white dark:bg-gray-800 ${
                              i === videosList.length - 1
                                ? ""
                                : "border-gray-200 border-b-2 dark:border-gray-700"
                            }`}
                            key={video._id}
                          >
                            <Table.Cell>
                              <img
                                src={video.thumbnailURL}
                                alt="bolg image"
                                className="w-32 h-14 rounded-md bg-gray-500 object-cover"
                              />
                            </Table.Cell>

                            <Table.Cell>{video.title}</Table.Cell>

                            <Table.Cell>
                              {video.videoDuration} Minutes
                            </Table.Cell>

                            <Table.Cell>{video.category}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  ) : (
                    <div className="w-full h-[350px] flex flex-col items-center justify-center">
                      <FaFaceSadTear size="70" />
                      <p className="text-sm text-center mt-5 mb-2 font-[Inter] font-semibold">
                        Oops! There are no blog posts yet.
                      </p>
                      <p className="text-[14px] text-center font-[Inter]">
                        Please create and publish new blog posts to engage your
                        audience.
                      </p>
                    </div>
                  )}
                </div>
                {/* User's Videos details */}

                {/* Booked Trial Details */}
                <div className="w-[850px] md:mx-auto px-3 py-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-custom-light-dark">
                  <div className="flex items-center gap-2 justify-between mb-5">
                    <p className="font-[Inter] text-sm font-medium">
                      Recent Booked Trials
                    </p>
                    <Link to="/admin-dashboard?tab=trials">
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
                  {trialsList.length > 0 ? (
                    <Table hoverable className="font-[Inter] h-[fit-content]">
                      <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Age</Table.HeadCell>
                        <Table.HeadCell>Position</Table.HeadCell>
                        <Table.HeadCell>Confirmation</Table.HeadCell>
                      </Table.Head>

                      <Table.Body className="font-medium text-[15px]">
                        {trialsList.map((trial, i) => (
                          <Table.Row
                            className={`bg-white dark:bg-gray-800 ${
                              i === trialsList.length - 1
                                ? ""
                                : "border-gray-200 border-b-2 dark:border-gray-700"
                            }`}
                            key={trial._id}
                          >
                            <Table.Cell>{trial.playerFullName}</Table.Cell>

                            <Table.Cell>
                              {calculateAge(trial.playerDOB)}
                            </Table.Cell>

                            <Table.Cell>{trial.playerPosition}</Table.Cell>

                            <Table.Cell>
                              {trial.isConfirmed ? "Confirmed" : "Pending"}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  ) : (
                    <div className="w-full h-[300px] flex flex-col items-center justify-center">
                      <FaFaceSadTear size="70" />
                      <p className="text-sm text-center mt-5 mb-2 font-[Inter] font-semibold">
                        Oops! There are no booked football trials yet.
                      </p>
                      <p className="text-[14px] text-center font-[Inter]">
                        Please monitor for new trial bookings and confirm
                        applicant details promptly.
                      </p>
                    </div>
                  )}
                </div>
                {/* Booked Trial Details */}
              </>
            )}
          </div>
          {/* Users, Comments, Posts details */}
        </div>
      )}
    </div>
  );
}

export default DashboardComponent;
