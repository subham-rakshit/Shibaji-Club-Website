import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  FileInput,
  Select,
  TextInput,
  Modal,
  Label,
} from "flowbite-react";
import JoditEditor from "jodit-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

function CreateVideo() {
  //* User provided image file and temporary image URL state -->
  const [imageUploadFile, setImageUploadFile] = useState(null);
  const [imageUploadFileURL, setImageUploadFileURL] = useState(null);

  //* Image File Uploading progress state -->
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [isImageFileUploading, setIsImageFileUploading] = useState(false);

  //* Preview Image Modal State -->
  const [openModal, setOpenModal] = useState(false);

  //* Image File Uploading Error state -->
  const [imageFileUploadingError, setImageFileUploadingError] = useState(null);

  //* JoditEditor state -->
  const editor = useRef(null);

  //* Create post Form Data state -->
  const [videoFormData, setVideoFormData] = useState({});

  //* Publish details state -->
  const [publishSuccess, setPublishSuccess] = useState(null);
  const [publishError, setPublishError] = useState(null);

  //* Video URL state -->
  const [videoUrl, setVideoUrl] = useState(null);

  const navigate = useNavigate();

  //* Onchange image upload input file -->
  const handleImageFileChange = (e) => {
    const imgFile = e.target.files[0];
    //? Image file with all details
    setImageUploadFile(imgFile);
    //? Create Image file URL in localhost environment for temporary
    setImageUploadFileURL(URL.createObjectURL(imgFile));
  };

  //* When ever imageUploadFile changes we call the imageFileUploading method using useEffect -->
  useEffect(() => {
    if (imageUploadFile) {
      imageFileUploading();
    }
  }, [imageUploadFile]);

  //* Image File Uploading in Firebase -->
  const imageFileUploading = () => {
    setIsImageFileUploading(true);
    setImageFileUploadingError(null);
    //? To understand the requesting person is correct or not by passing the firebase app which is exported from firebase.js file.
    const storage = getStorage(app);
    //? For unique image file name
    const uniqueImageFileName =
      new Date().getTime() + "-" + imageUploadFile.name;
    //? Firebase storage reference
    const storageReference = ref(storage, uniqueImageFileName);
    //? uploadTask is kind of method to upload image files, and we can get info while image is uploading eg. amount of bytes that been uploaded and etc.. [ NOTE : pass imageUploadFile not imageUploadFileURL as an argument means pass the all info of selected image file.]
    const uploadTask = uploadBytesResumable(storageReference, imageUploadFile);
    //? Get those uploading info (no. of bytes, errors etc.) -->
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //? progess value like = 10.422, we have to rounded this number.
        setImageFileUploadingProgress(progess.toFixed(0));
      },
      (error) => {
        setImageFileUploadingError("File size must be less than 2MB!");
        setImageFileUploadingProgress(null);
        setImageUploadFile(null);
        setImageUploadFileURL(null);
        setIsImageFileUploading(false);
      },
      //? Download image URL from Firebase
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadFileURL(downloadURL);
          setIsImageFileUploading(false);
        });
      }
    );
  };

  //* Onclick Image Upload Button Click -->
  const handleUploadButtonClick = () => {
    if (!imageUploadFileURL || !videoUrl) {
      setImageFileUploadingError("Fill the input properly!");
      return;
    }
    setVideoFormData({ ...videoFormData, blogImage: imageUploadFileURL });
  };

  //* Form Submit -->
  const handlePostDataFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = "/api/post/create-post";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoFormData),
      };
      const res = await fetch(api, options);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setPublishError(null);
        setPublishSuccess(data.message);
        setVideoFormData({});
        navigate(`/post/${data.postDetails.slug}`);
      }
      if (!res.ok) {
        setPublishError(data.extraDetails);
        setPublishSuccess(null);
      }
    } catch (error) {
      setPublishError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 w-full max-w-3xl mx-auto min-h-screen my-[65px] lg:mt-[76px] font-[Inter] flex flex-col justify-center">
      <div className="flex items-center justify-between gap-4 mb-2 lg:mb-5">
        <h1 className="text-center lg:text-left text-xl lg:text-3xl my-5 font-semibold">
          Create a video
        </h1>
        <img
          src="/create-post-logo.png"
          alt="post"
          className="w-[60px] lg:w-[80px] h-[60px] lg:h-[80px]"
        />
      </div>
      <form className="flex flex-col gap-4" onSubmit={handlePostDataFormSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between mb-2">
          <TextInput
            type="text"
            placeholder="Write post's title"
            required
            id="title"
            className="flex-1"
            name="title"
            sizing="sm"
            value={videoFormData.title ? videoFormData.title : ""}
            onChange={(e) =>
              setVideoFormData({ ...videoFormData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setVideoFormData({ ...videoFormData, category: e.target.value })
            }
            sizing="sm"
            value={
              videoFormData.category ? videoFormData.category : "uncategorized"
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="about club">About Club</option>
            <option value="matches">Matches</option>
            <option value="practices">Practices</option>
            <option value="others">Others</option>
            <option value="euro cup 2024">Euro Cup 2024</option>
          </Select>
        </div>
        <div
          className={`flex flex-col gap-4 border-4 border-teal-500 border-dotted rounded-tr-2xl rounded-bl-2xl p-3 ${
            imageFileUploadingError || imageUploadFileURL ? "" : "mb-2 lg:mb-5"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-8">
            <div className="flex flex-col gap-2 w-full">
              <Label
                value="Upload image"
                htmlFor="image-upload"
                className="text-xs"
              />

              <FileInput
                type="file"
                accept="image/*"
                sizing="sm"
                id="image-upload"
                onChange={handleImageFileChange}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label value="Video URL" className="text-xs" />
              <TextInput
                sizing="sm"
                placeholder="Add video URL"
                onChange={handleImageFileChange}
                className="w-full"
                required
              />
            </div>
          </div>
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            outline
            size="sm"
            className="font-[Inter] w-full sm:w-[fit-content] sm:mx-auto"
            disabled={isImageFileUploading}
            onClick={handleUploadButtonClick}
          >
            {parseInt(imageFileUploadingProgress) < 100
              ? `Uploading... ${imageFileUploadingProgress}%`
              : "Upload"}
          </Button>
        </div>
        {imageFileUploadingError && (
          <Alert
            color="failure"
            onDismiss={() => setImageFileUploadingError(null)}
            className="font-[Inter] text-semibold"
          >
            {imageFileUploadingError}
          </Alert>
        )}
        {videoFormData.blogImage && (
          <>
            <Button
              gradientDuoTone="purpleToPink"
              onClick={() => setOpenModal(true)}
            >
              Image Review
            </Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
              <Modal.Header>Blog Thubnail Preview</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <img
                    src={imageUploadFileURL}
                    alt="blog thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Modal.Body>
            </Modal>
          </>
        )}
        <JoditEditor
          ref={editor}
          value={videoFormData.content ? videoFormData.content : ""}
          onChange={(newContent) =>
            setVideoFormData({ ...videoFormData, content: newContent })
          }
          config={{
            placeholder: "Add video descriptions...",
            height: "300px",
          }}
          className="text-[#333]"
        />

        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          className="mt-5"
          size="sm"
        >
          Publish
        </Button>
      </form>
      {publishSuccess && (
        <Alert
          color="success"
          onDismiss={() => setPublishSuccess(null)}
          className="mt-3"
        >
          {publishSuccess}
        </Alert>
      )}
      {publishError && (
        <Alert
          color="failure"
          onDismiss={() => setPublishError(null)}
          className="mt-3"
        >
          {publishError}
        </Alert>
      )}
    </div>
  );
}

export default CreateVideo;
