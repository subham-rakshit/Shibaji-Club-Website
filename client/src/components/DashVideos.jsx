import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Modal } from "flowbite-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { IoImagesSharp } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { PacmanLoader } from "react-spinners";
import DashToggleButton from "./DashToggleButton";

function DashVideos() {
  const { currentUser } = useSelector((state) => state.user);
  const [allVideosData, setAllVideosData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreData, setShowMoreData] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const navigate = useNavigate();

  //* Fetch All videos data when ever admin user is changed -->
  useEffect(() => {
    setIsLoading(true);
    const getVideos = async () => {
      try {
        const res = await fetch(`/api/video/getvideos`);
        const data = await res.json();

        if (res.ok) {
          setAllVideosData(data.videos);
          setIsLoading(false);
          if (data.videos.length < 9) {
            setShowMoreData(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      getVideos();
    }
  }, [currentUser._id]);

  //* Show more btn functionality -->
  const handleShowMore = async () => {
    const startIndex = allVideosData.length;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/video/getvideos?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setAllVideosData((prev) => [...prev, ...data.videos]);
        setIsLoading(false);
        if (data.videos.length < 9) {
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
        `/api/video/deletevideo/${selectedVideoId}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setAllVideosData((prev) =>
          prev.filter((post) => post._id !== selectedVideoId)
        );
        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });
      } else {
        toast.error(data.extraDetails, {
          theme: "colored",
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`table-auto overflow-x-scroll md:mx-auto px-3 py-5 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 flex-1 ${
        allVideosData.length === 0 || isLoading === true
          ? "flex flex-col justify-center"
          : ""
      }`}
    >
      {isLoading ? (
        <PacmanLoader color="#36d7b7" className="mx-auto" />
      ) : currentUser.isAdmin && allVideosData.length > 0 ? (
        <div className="overflow-x-auto w-[950px] mx-auto flex flex-col gap-5">
          {/* Toggle Button */}
          <DashToggleButton />

          <Table hoverable className="shadow-md font-[Inter]">
            <Table.Head className="text-[14px]">
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Video thumbnail</Table.HeadCell>
              <Table.HeadCell>Video title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="text-sm font-medium">
              {allVideosData.map((eachVideo, i) => (
                <Table.Row
                  className={`bg-white dark:bg-gray-800 ${
                    i === allVideosData.length - 1
                      ? ""
                      : "border-gray-200 border-b-2 dark:border-gray-700"
                  }`}
                  key={eachVideo._id}
                >
                  <Table.Cell className="whitespace-nowrap text-gray-700 dark:text-gray-300 text-[14px]">
                    {new Date(eachVideo.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/video/${eachVideo.slug}`}>
                      <img
                        src={eachVideo.thumbnailURL}
                        alt={eachVideo.title}
                        className="w-20 h-10 object-cover bg-gray-500 rounded-sm"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="hover:underline hover:text-blue-400 text-xs line-clamp-1"
                      to={`/video/${eachVideo.slug}`}
                    >
                      {eachVideo.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="text-xs">
                    {eachVideo.category}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className="text-red-600 hover:underline dark:text-red-500 cursor-pointer"
                      onClick={() => {
                        setShowModel(true);
                        setSelectedVideoId(eachVideo._id);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-video/${eachVideo._id}`}>
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
        <div className="h-screen flex flex-col">
          <DashToggleButton />
          <div className="h-full flex flex-col justify-center items-center">
            <IoImagesSharp size="100" className="mx-auto mb-10" />
            <h1 className="text-gray-500 dark:text-gray-300 text-2xl font-bold font-[Inter] text-center">
              Oops! No videos to show
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-xs font-normal font-[Inter] text-center mt-2">
              You haven't created any videos yet. Don't miss out—start creating
              your first video now and share your thoughts with the community!
            </p>
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              outline
              className="font-[Inter] w-[fit-content] mx-auto mt-5"
              onClick={() => navigate("/create-video")}
            >
              Create videos
            </Button>
          </div>
        </div>
      )}
      <Modal
        show={showModel}
        size="md"
        onClose={() => setShowModel(false)}
        popup
        className="pt-[60px] sm:pt-[70px]"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this video?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
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

export default DashVideos;
