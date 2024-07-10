import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Modal } from "flowbite-react";
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
  const [isConfirmed, setIsConfirmed] = useState(false);

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

  //* Update the trail booking confirmation -->
  useEffect(() => {
    setIsLoading(true);

    const updateTrialDetails = async () => {
      try {
        const res = await fetch(
          `/api/trial/confirm-trial/${confirmedTrialId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isConfirmed }),
          }
        );
        const data = await res.json();

        if (res.ok) {
          alert(data.message);
          // Update the trial data in the UI
          const updatedTrials = allTrialsData.map((trial) =>
            trial._id === data.trialDetails._id ? data.trialDetails : trial
          );
          setAllTrialsData(updatedTrials);
          setIsConfirmed(false);
          setConfirmedTrialId("");
        } else {
          alert("Failed to update trial confirmation status");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (
      currentUser.isAdmin &&
      confirmedTrialId &&
      confirmedTrialId.length > 0 &&
      isConfirmed
    ) {
      updateTrialDetails();
    }
  }, [confirmedTrialId, isConfirmed, currentUser.isAdmin]);

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
      className={`min-h-screen table-auto overflow-x-scroll md:mx-auto px-3 py-5 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 flex-1 ${
        allTrialsData.length === 0 || isLoading === true
          ? "flex flex-col justify-center"
          : ""
      } border`}
    >
      {isLoading ? (
        <PacmanLoader color="#36d7b7" className="mx-auto" />
      ) : currentUser.isAdmin && allTrialsData.length > 0 ? (
        <div className="overflow-x-auto w-[1024px] mx-auto flex flex-col gap-5">
          {/* Toggle Button */}
          <DashToggleButton />

          <Table hoverable className="shadow-md font-[Inter]">
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
            <Table.Body className="text-[13px] font-medium">
              {allTrialsData.map((trial, i) => {
                //! Convert DOB to age before till date [Starts Here] ****

                const [year, month, day] = trial.playerDOB
                  .split("-")
                  .map(Number);
                const requestDate = new Date(year, month - 1, day); // months are zero-based in JS Date

                const todayDate = new Date(); // Today's date

                let applicantAge =
                  todayDate.getFullYear() - requestDate.getFullYear(); // Initial age
                let monthDiff = todayDate.getMonth() - requestDate.getMonth(); // Check Applicant Bday already will be arrived or not

                //* Condition means - If monthDiff is negetive. That means Bday will be arrived so, age will be age - 1. OR . (monthDiff === 0 && todayDate.getDate() < requestDate.getDate()):- means, Checks if the birth month is the same as the current month, but the birth day has not yet occurred. That situation also age - 1.

                if (
                  monthDiff < 0 ||
                  (monthDiff === 0 &&
                    todayDate.getDate() < requestDate.getDate())
                ) {
                  applicantAge--;
                }

                //! Convert DOB to age before till date [Ends Here] ****

                return (
                  <Table.Row
                    className={`bg-white dark:bg-gray-800 ${
                      i === allTrialsData.length - 1
                        ? ""
                        : "border-gray-200 border-b-2 dark:border-gray-700"
                    }`}
                    key={trial._id}
                  >
                    <Table.Cell className="whitespace-nowrap text-gray-700 dark:text-gray-300 text-[14px]">
                      {new Date(trial.createdAt).toLocaleDateString()}
                    </Table.Cell>

                    <Table.Cell className="text-[10px]">
                      {trial.playerFullName}
                    </Table.Cell>

                    <Table.Cell className="font-bold text-black dark:text-gray-200">
                      {applicantAge}
                    </Table.Cell>

                    <Table.Cell className="text-[10px]">
                      {trial.playerCity}
                    </Table.Cell>

                    <Table.Cell className="font-bold text-black dark:text-gray-200">
                      {trial.playerPosition[0].toUpperCase() +
                        trial.playerPosition.slice(
                          1,
                          trial.playerPosition.length + 1
                        )}
                    </Table.Cell>

                    <Table.Cell className="font-bold text-black dark:text-gray-200">
                      {trial.playerContactNumber}
                    </Table.Cell>

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

                    <Table.Cell>
                      {trial.isConfirmed ? (
                        <FaCircleCheck size="20" color="green" />
                      ) : (
                        <input
                          type="checkbox"
                          className="rounded-full cursor-pointer"
                          onChange={() => {
                            setConfirmedTrialId(trial._id);
                            setIsConfirmed(true);
                          }}
                        />
                      )}
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
            Oops! It looks like no one has booked a trial yet.
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-xs font-normal font-[Inter] text-center mt-2">
            Currently, there are no booked trial data available to display.
            Please check back later for updates.
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
    </div>
  );
}

export default DashTrial;
