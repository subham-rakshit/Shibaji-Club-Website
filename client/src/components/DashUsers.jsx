import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Modal } from "flowbite-react";
import { IoImagesSharp } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

import { PacmanLoader } from "react-spinners";

function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [allUsersData, setAllUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreData, setShowMoreData] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  //* Fetch All data when ever admin user is changed -->
  useEffect(() => {
    setIsLoading(true);
    const getUserDetails = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();

        if (res.ok) {
          setAllUsersData(data.users);
          setIsLoading(false);
          if (data.users.length < 9) {
            setShowMoreData(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      getUserDetails();
    }
  }, [currentUser._id]);

  //* Show more btn functionality -->
  const handleShowMore = async () => {
    const startIndex = allUsersData.length;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setAllUsersData((prev) => [...prev, ...data.users]);
        setIsLoading(false);
        if (data.users.length < 9) {
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
  const handleDeleteUser = async (e) => {
    setShowModel(false);
    try {
      const res = await fetch(`/api/user/delete/${selectedUserId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setAllUsersData((prev) =>
          prev.filter((user) => user._id !== selectedUserId)
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
        allUsersData.length === 0 || isLoading === true
          ? "flex flex-col justify-center"
          : ""
      }`}
    >
      {isLoading ? (
        <PacmanLoader color="#36d7b7" className="mx-auto" />
      ) : currentUser.isAdmin && allUsersData.length > 0 ? (
        <div className="overflow-x-auto w-[1024px] mx-auto">
          <Table hoverable className="shadow-md font-[Inter]">
            <Table.Head className="text-[14px]">
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="text-[13px] font-medium">
              {allUsersData.map((user, i) => (
                <Table.Row
                  className={`bg-white dark:bg-gray-800 ${
                    i === allUsersData.length - 1
                      ? ""
                      : "border-gray-200 border-b-2 dark:border-gray-700"
                  }`}
                  key={user._id}
                >
                  <Table.Cell className="whitespace-nowrap text-gray-700 dark:text-gray-300 text-[14px]">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-8 h-8 object-cover bg-gray-500 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {user.username.length > 20
                      ? user.username.substring(0, 15) + "..."
                      : user.username}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell className="text-xs">
                    {user.isAdmin ? (
                      <FaCircleCheck size="19" color="#31cc3e" />
                    ) : (
                      <MdCancel size="22" color="#ed2456" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className="text-red-600 hover:underline dark:text-red-500 cursor-pointer"
                      onClick={() => {
                        setShowModel(true);
                        setSelectedUserId(user._id);
                      }}
                    >
                      Delete
                    </span>
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
            Oops! No Users to show
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-xs font-normal font-[Inter] text-center mt-2">
            Currently, there are no users available to display. Please check
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
              Are you sure you want to remove this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
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

export default DashUsers;
