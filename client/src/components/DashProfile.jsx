import { useSelector, useDispatch } from "react-redux";
import { Input } from "../components";

import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Spinner } from "flowbite-react";
import Cookies from "js-cookie";

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
} from "../redux-slice/userSlice";

function DashProfile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [imageUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setIageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(null);
  const [possibleErrors, setPossibleErrors] = useState(null);
  const imageFileRef = useRef();
  const dispatch = useDispatch();

  // console.log(imageFile);
  // console.log(imageUploadProgress, imageFileUploadError);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadFile();
    }
  }, [imageFile]);

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
    setImageFileUploadError(null);
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
        setImageFileUploadError("File must be less than 2MB");
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

  console.log(formData);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // console.log(Object.keys(formData));
    setUserUpdateSuccess(null);
    setPossibleErrors(null);
    const token = Cookies.get("jwt_token");
    console.log(token);
    if (Object.keys(formData).length === 0) {
      setPossibleErrors("No changes made!");
      return;
    }
    //? This is protect our request from sending request between image uploading proccess.
    if (imageFileUploading) {
      setPossibleErrors("Please wait for image to be uploaded!");
      return;
    }

    try {
      dispatch(updateStart());
      const api = `http://localhost:5000/api/user/update/${currentUser._id}`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, jwt_token: token }),
      };
      const res = await fetch(api, options);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        dispatch(updateSuccess(data.userDetails));
        setFormData({});
        setUserUpdateSuccess(data.message);
      } else {
        dispatch(updateFailure(data.extraDetails));
        setPossibleErrors(data.extraDetails);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setPossibleErrors(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-3 py-8 w-full">
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
        {imageFileUploadError && (
          <Alert color="failure" className="mb-2">
            {imageFileUploadError}
          </Alert>
        )}
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

          <p>Change password</p>
          <Input
            type="password"
            name="password"
            placeholder="********"
            labelText="New password"
            required={0}
            onChange={handleFormDataChange}
          />
        </div>
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          className="mt-7 font-[Inter]"
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
      </form>
      <div className="text-red-500 flex justify-between items-center mt-2 text-xs font-[Inter] font-normal">
        <span className="cursor-pointer font-bold hover:font-extrabold">
          Delete Account
        </span>
        <span className="cursor-pointer font-bold hover:font-extrabold">
          Sign Out
        </span>
      </div>
      {userUpdateSuccess && (
        <Alert color="success" className="mt-5">
          {userUpdateSuccess}
        </Alert>
      )}
      {possibleErrors && (
        <Alert color="failure" className="mt-5">
          {possibleErrors}
        </Alert>
      )}
    </div>
  );
}

export default DashProfile;
