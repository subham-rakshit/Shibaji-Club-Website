import { useSelector, useDispatch } from "react-redux";
import { Input } from "../components";

import React, { useEffect, useRef, useState } from "react";
import { Button, Spinner, Modal, Select, Label } from "flowbite-react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from "../redux-slice/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DashProfile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [imageUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploading, setIageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const imageFileRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      //? Create a temporary image url in localhost environment
      setImageFileURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadFile();
    }
  }, [imageFile]);

  // Profile Iamge upload
  const uploadFile = () => {
    //! This code in Google Firebase, u have to change the rules of user's selected file's size and type. -->
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setIageFileUploading(true);
    //? To understand the requesting person is correct or not by passing the firebase app which is exported from firebase.js file.
    const storage = getStorage(app);

    //? For unique filename for multiple times, we just contatinate the current time with the filename which are selected.
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);

    //? uploadTask is kind of method to upload image files, and we can get info while image is uploading eg. amount of bytes that been uploaded and etc.. [ NOTE : pass imageFile not imageFileURL means pass the all info of selected image file.]
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    //? Get those uploading info (no. of bytes, errors etc.) -->
    uploadTask.on(
      "state_changed",
      //* snapshot is a kind of info of uploading bytes by bytes. We can record the uploading progress of uploading.
      (snapshot) => {
        //* How many % have been uploaded and save it in a piece of state -->
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // progess value like = 10.422, we have to rounded this number.
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        toast.error("File must be less than 2MB", {
          theme: "colored",
          position: "bottom-center",
        });
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileURL(null);
        setIageFileUploading(false);
      },
      //? File download and genrate image link to store in imageFileURL state.
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setIageFileUploading(false);
        });
      }
    );
  };

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Update account
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      toast.error("No changes made!", {
        theme: "colored",
        position: "bottom-center",
      });
      return;
    }
    //? This is protect our request from sending request between image uploading proccess.
    if (imageFileUploading) {
      toast.error("Please wait for image to be uploaded!", {
        theme: "colored",
        position: "bottom-center",
      });
      return;
    }

    try {
      dispatch(updateStart());
      const api = `/api/user/update/${currentUser._id}`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      };
      const res = await fetch(api, options);
      const data = await res.json();
      if (res.ok) {
        dispatch(updateSuccess(data.userDetails));
        setFormData({});
        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });
        navigate("/");
      } else {
        dispatch(updateFailure(data.extraDetails));
        toast.error(data.extraDetails, {
          theme: "colored",
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error.message);
      dispatch(updateFailure(error.message));
      toast.error(error.message, {
        theme: "colored",
        position: "bottom-center",
      });
    }
  };

  // Handle Delete account
  const handleDeleteFunction = async () => {
    setOpenModal(false);
    try {
      dispatch(deleteUserStart());

      const api = `/api/user/delete/${currentUser._id}`;
      const options = {
        method: "DELETE",
      };
      const res = await fetch(api, options);
      const data = await res.json();
      if (res.ok) {
        dispatch(deleteUserSuccess());
        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });
      } else {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.extraDetails, {
          theme: "colored",
          position: "bottom-center",
        });
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error(error.message, {
        theme: "colored",
        position: "bottom-center",
      });
    }
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    try {
      const api = "/api/user/signout";
      const options = {
        method: "POST",
      };
      const res = await fetch(api, options);
      const data = await res.json();

      if (res.ok) {
        dispatch(signOutSuccess());
        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-3 py-8 w-full h-full">
      <h1 className="font-[Inter] font-[700] text-xl text-center my-3">
        Profile
      </h1>
      <form className="flex flex-col" onSubmit={handleFormSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={imageFileRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-xl overflow-hidden rounded-full mb-3 md:mb-7"
          onClick={() => imageFileRef.current.click()}
        >
          {imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress || 0}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(18, 120, 204, ${imageUploadProgress / 100})`,
                },
                text: {
                  fontWeight: "bold",
                },
              }}
            />
          )}
          <img
            src={imageFileURL || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover ${
              imageUploadProgress && imageUploadProgress < 80 && "opacity-40"
            }`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            labelText="Username"
            name="username"
            placeholder="Firstname Lastname"
            defaultValue={currentUser.username}
            onChange={handleFormDataChange}
          />
          <Input
            labelText="Email"
            name="email"
            placeholder="example@example.com"
            defaultValue={currentUser.email}
            onChange={handleFormDataChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="********"
            labelText="New password"
            required={0}
            onChange={handleFormDataChange}
          />
          <Label
            className="font-semibold font-[Inter] text-xs"
            value="Category"
          />
          <Select
            id="category"
            defaultValue={currentUser.category}
            onChange={handleFormDataChange}
            name="category"
            required
          >
            <option name="Footballer">Footballer</option>
            <option name="General">General</option>
          </Select>
        </div>
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          className="mt-7 font-[Inter]"
          disabled={loading || imageFileUploading}
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Updating ....</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
        <div className="flex items-center justify-between gap-3 mt-5">
          {currentUser.isAdmin && (
            <>
              <Link to="/create-post" className="w-full">
                <Button
                  type="button"
                  outline
                  gradientDuoTone="purpleToPink"
                  className="font-[Inter] w-full"
                >
                  Create a post
                </Button>
              </Link>
              <Link to="/create-video" className="w-full">
                <Button
                  type="button"
                  outline
                  gradientDuoTone="greenToBlue"
                  className="font-[Inter] w-full"
                >
                  Create a video
                </Button>
              </Link>
            </>
          )}
        </div>
      </form>
      <div className="text-red-500 flex justify-between items-center mt-2 text-xs font-[Inter] font-normal">
        <span
          className="cursor-pointer font-bold hover:font-extrabold"
          onClick={() => setOpenModal(true)}
        >
          Delete Account
        </span>
        <span
          className="cursor-pointer font-bold hover:font-extrabold"
          onClick={handleSignOut}
        >
          Sign Out
        </span>
      </div>

      {/* Delete Modal */}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="pt-[60px] sm:pt-[70px]"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteFunction}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashProfile;
