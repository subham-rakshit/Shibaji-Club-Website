import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Modal } from "flowbite-react";
import { toast } from "react-toastify";
import { IoImagesSharp } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCircleCheck } from "react-icons/fa6";

import { PacmanLoader } from "react-spinners";
import DashToggleButton from "./DashToggleButton";

function DashTrial() {
  const { currentUser } = useSelector((state) => state.user);
  const [allTrialsData, setAllTrialsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreData, setShowMoreData] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [confirmedTrialId, setConfirmedTrialId] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  //* Fetch All data when ever admin is changed and confirmedTrialId is present -->
  useEffect(() => {
    setIsLoading(true);
    const getTrialsDetails = async () => {
      try {
        const res = await fetch(`/api/trial/get-trials-data`);
        const data = await res.json();

        if (res.ok) {
          setAllTrialsData(data.trials);
          if (data.trials.length < 9) {
            setShowMoreData(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (currentUser.isAdmin || confirmedTrialId.length > 0) {
      getTrialsDetails();
    }
  }, [currentUser._id, confirmedTrialId]);

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

  //* Show more btn functionality -->
  const handleShowMore = async () => {
    const startIndex = allTrialsData.length;
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/trial/get-trials-data?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setAllTrialsData((prev) => [...prev, ...data.trials]);
        setIsLoading(false);
        if (data.trials.length < 9) {
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
  const handleDeleteTrial = async (e) => {
    setShowModel(false);
    try {
      const res = await fetch(
        `/api/trial/delete-trial-data/${confirmedTrialId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setAllTrialsData((prev) =>
          prev.filter((trial) => trial._id !== confirmedTrialId)
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

  //* Handle trial confirmations -->
  const handleConfirmTrial = async (trialId) => {
    setConfirmedTrialId(trialId);
    setShowConfirmModal(true);
  };

  //* Handle Update Trail with Trail Confirmations mail -->
  const confirmTrial = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    try {
      const res = await fetch(`/api/trial/confirm-trial/${confirmedTrialId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isConfirmed: true }),
      });
      const data = await res.json();

      if (res.ok) {
        // Update the trial data in the UI
        setAllTrialsData((prev) =>
          prev.map((trial) =>
            trial._id === data.trialDetails._id ? data.trialDetails : trial
          )
        );
        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });
      } else {
        toast.error("Failed to update trial confirmation status", {
          theme: "colored",
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
      setConfirmedTrialId("");
    }
  };

  return (
    <div
      className={`table-auto overflow-x-scroll md:mx-auto px-3 py-5 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 flex-1 ${
        allTrialsData.length === 0 || isLoading === true
          ? "flex flex-col justify-center"
          : ""
      }`}
    >
      {isLoading ? (
        <PacmanLoader color="#36d7b7" className="mx-auto" />
      ) : currentUser.isAdmin && allTrialsData.length > 0 ? (
        <div className="overflow-x-auto w-[1024px] mx-auto flex flex-col gap-5">
          {/* Toggle Button */}
          <DashToggleButton />

          <Table hoverable className="shadow-md font-[Inter]">
            {/* Table Headers */}
            <Table.Head className="text-[14px]">
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Age</Table.HeadCell>
              <Table.HeadCell>City</Table.HeadCell>
              <Table.HeadCell>Position</Table.HeadCell>
              <Table.HeadCell>Contact</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Confirmed</Table.HeadCell>
            </Table.Head>
            {/* Table Body */}
            <Table.Body className="text-[13px] font-medium">
              {allTrialsData.map((trial, i) => {
                // Table Row
                return (
                  <Table.Row
                    className={`bg-white dark:bg-gray-800 ${
                      i === allTrialsData.length - 1
                        ? ""
                        : "border-gray-200 border-b-2 dark:border-gray-700"
                    }`}
                    key={trial._id}
                  >
                    {/* Date */}
                    <Table.Cell className="whitespace-nowrap text-gray-700 dark:text-gray-300 text-[14px]">
                      {new Date(trial.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    {/* Full name */}
                    <Table.Cell className="text-[10px]">
                      {trial.playerFullName}
                    </Table.Cell>
                    {/* Age */}
                    <Table.Cell className="font-bold text-black dark:text-gray-200">
                      {calculateAge(trial.playerDOB)}
                    </Table.Cell>
                    {/* City */}
                    <Table.Cell className="text-[10px]">
                      {trial.playerCity}
                    </Table.Cell>
                    {/* Position */}
                    <Table.Cell className="text-[10px]">
                      {trial.playerPosition[0].toUpperCase() +
                        trial.playerPosition.slice(
                          1,
                          trial.playerPosition.length + 1
                        )}
                    </Table.Cell>
                    {/* Phone number */}
                    <Table.Cell className="font-bold text-black dark:text-gray-200">
                      {trial.playerContactNumber}
                    </Table.Cell>
                    {/* Delete */}
                    <Table.Cell>
                      <span
                        className="text-red-600 hover:underline dark:text-red-500 cursor-pointer mx-auto"
                        onClick={() => {
                          setShowModel(true);
                          setConfirmedTrialId(trial._id);
                        }}
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    {/* Confirmation */}
                    <Table.Cell>
                      {trial.isConfirmed ? (
                        <button
                          type="button"
                          className="rounded-full cursor-not-allowed"
                          onClick={() => alert("Already Confirmed.")}
                        >
                          <FaCircleCheck size="20" color="green" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="rounded-full cursor-pointer"
                          onClick={() => handleConfirmTrial(trial._id)}
                        >
                          <FaCircleCheck size="20" />
                        </button>
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          {/* Show more btn */}
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
              Oops! It looks like no one has booked a trial yet.
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-xs font-normal font-[Inter] text-center mt-2">
              Currently, there are no booked trial data available to display.
              Please check back later for updates.
            </p>
          </div>
        </div>
      )}

      {/* Model for Delete btn */}
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
              Are you sure you want to remove this booked trial?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteTrial}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModel(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* Model for Confirmation btn */}
      <Modal
        show={showConfirmModal}
        size="md"
        onClose={() => setShowConfirmModal(false)}
        popup
        className="pt-[60px] sm:pt-[70px]"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to confirm this trial?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={confirmTrial}>
                Yes, confirm
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setShowConfirmModal(false);
                  setConfirmedTrialId("");
                }}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashTrial;
