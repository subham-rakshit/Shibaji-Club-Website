import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  FileInput,
  Select,
  TextInput,
  Modal,
  Label,
  Checkbox,
} from "flowbite-react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { FaCloudUploadAlt } from "react-icons/fa";

function UpdateVideo() {
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
  const [isLoading, setIsLoading] = useState(false);

  //* Publish details state -->
  const [publishSuccess, setPublishSuccess] = useState(null);
  const [publishError, setPublishError] = useState(null);

  const { videoId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  //* Fetch the details of will be updated Post -->
  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        setIsLoading(true);
        setPublishError(null);
        const res = await fetch(`/api/video/getvideos?videoId=${videoId}`);
        const data = await res.json();

        if (res.ok) {
          setVideoFormData(data.videos[0]);
          setIsLoading(false);
        } else {
          console.log("API ERRO: ", data.extraDetails);
          toast.error(data.extraDetails, {
            theme: "colored",
            position: "bottom-center",
          });
          return;
        }
      } catch (error) {
        console.log("Backend Error: ", error.message);
        setIsLoading(false);
      }
    };
    if (currentUser.isAdmin && videoId) {
      getVideoDetails();
    }
  }, [videoId]);

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
        toast.error("File size must be less than 2MB!", {
          theme: "colored",
          position: "bottom-center",
        });
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

  //* Thumbnail Image upload -->
  const handleThumbnailUpload = () => {
    if (!imageUploadFileURL) {
      toast.error("Please select a image to upload!", {
        theme: "colored",
        position: "bottom-center",
      });
      return;
    }
    setVideoFormData({
      ...videoFormData,
      thumbnailURL: imageUploadFileURL,
    });
  };

  //* Input Age Range Boxes content -->
  const handleAgeRangeInput = (e) => {
    if (!videoFormData.ageRange.includes(e.target.value)) {
      setVideoFormData({
        ...videoFormData,
        ageRange: [...videoFormData.ageRange, e.target.value],
      });
    } else {
      setVideoFormData({
        ...videoFormData,
        ageRange: videoFormData.ageRange.filter(
          (age) => age !== e.target.value
        ),
      });
    }
  };

  //* Input Age Required Equipments content -->
  const handleRequiredEquipmentsInput = (e) => {
    if (!videoFormData.requiredEquipments.includes(e.target.value)) {
      setVideoFormData({
        ...videoFormData,
        requiredEquipments: [
          ...videoFormData.requiredEquipments,
          e.target.value,
        ],
      });
    } else {
      setVideoFormData({
        ...videoFormData,
        requiredEquipments: videoFormData.requiredEquipments.filter(
          (equipment) => equipment !== e.target.value
        ),
      });
    }
  };

  //* Input Age Required Players content -->
  const handleRequiredPlayersInput = (e) => {
    if (!videoFormData.requiredPlayers.includes(e.target.value)) {
      setVideoFormData({
        ...videoFormData,
        requiredPlayers: [...videoFormData.requiredPlayers, e.target.value],
      });
    } else {
      setVideoFormData({
        ...videoFormData,
        requiredPlayers: videoFormData.requiredPlayers.filter(
          (player) => player !== e.target.value
        ),
      });
    }
  };

  //* Form Submit -->
  const handleVideoDataFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = `/api/video/updatevideo/${videoFormData._id}/${currentUser._id}`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoFormData),
      };
      const res = await fetch(api, options);
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });
        navigate(`/video/${data.videoDetails.slug}`);
      } else {
        toast.error(data.extraDetails, {
          theme: "colored",
          position: "bottom-center",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        theme: "colored",
        position: "bottom-center",
      });
      console.log("Backend Error: ", error.message);
    }
  };

  return (
    <div className="p-3 w-full h-full max-w-3xl mx-auto mt-[60px] sm:mt-[70px] font-[Inter] flex flex-col">
      {isLoading ? (
        <PacmanLoader color="#36d7b7" className="mx-auto" />
      ) : (
        <>
          <div className="flex items-center justify-between gap-4 mb-2 lg:mb-5">
            <h1 className="text-center lg:text-left text-xl lg:text-3xl my-5 font-semibold">
              Update your video
            </h1>
            <img
              src="/create-post-logo.png"
              alt="post"
              className="w-[60px] lg:w-[80px] h-[60px] lg:h-[80px]"
            />
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleVideoDataFormSubmit}
          >
            <div className="flex flex-col gap-4 sm:flex-row justify-between mb-2">
              {/* Title Input */}
              <TextInput
                type="text"
                placeholder="Write video title"
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
              {/* Title Input */}

              {/* Category Input */}
              <Select
                onChange={(e) =>
                  setVideoFormData({
                    ...videoFormData,
                    category: e.target.value,
                  })
                }
                sizing="sm"
                value={
                  videoFormData.category
                    ? videoFormData.category
                    : "uncategorized"
                }
              >
                <option value="uncategorized">Select a category</option>
                <option value="outfield">Outfield</option>
                <option value="one to one">One to One</option>
                <option value="saq">SAQ</option>
                <option value="goalkeepers">Goalkeepers</option>
                <option value="tutorials">Tutorials</option>
                <option value="youth curriculums">Youth Curriculums</option>
                <option value="fit challenge">Fit Challenge</option>
                <option value="strength training">Strength Training</option>
                <option value="club insides">Club Insides</option>
                <option value="matches">Matches</option>
                <option value="nutrition">Nutrition</option>
              </Select>
              {/* Category Input */}
            </div>

            <div
              className={`flex flex-col gap-4 border-4 border-slate-500 border-dotted rounded-tl-2xl rounded-br-2xl px-4 py-5 ${
                imageUploadFileURL ? "" : "mb-2 lg:mb-5"
              }`}
            >
              {/* Thumbnail and Video URL Inputbox  */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-8">
                {/* Thumbnail Img */}
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-2">
                    <Label
                      value={`${
                        imageFileUploadingProgress &&
                        parseInt(imageFileUploadingProgress) < 100
                          ? `Uploading... ${imageFileUploadingProgress}%`
                          : "Upload Thumbnail"
                      }`}
                      htmlFor="image-upload"
                      className="text-xs"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2">
                    <FileInput
                      type="file"
                      accept="image/*"
                      sizing="sm"
                      id="image-upload"
                      onChange={handleImageFileChange}
                      className="w-full"
                    />
                    {/* Desktop view Upload button */}
                    <Button
                      type="button"
                      className="font-[Inter] relative"
                      gradientDuoTone="purpleToBlue"
                      outline
                      size="xs"
                      onClick={handleThumbnailUpload}
                      disabled={isImageFileUploading}
                    >
                      <span className="absolute flex h-3 w-3 top-[-15%] left-[98%] sm:left-9">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                      </span>

                      <FaCloudUploadAlt size="30" />
                    </Button>
                  </div>
                </div>
                {/* Thumbnail Img */}

                {/* Video URL */}
                <div className="flex flex-col gap-2 w-full">
                  <Label
                    value="Video URL"
                    htmlFor="video-url"
                    className="text-xs"
                  />
                  <TextInput
                    sizing="sm"
                    id="video-url"
                    placeholder="Add video URL"
                    value={videoFormData.videoURL ? videoFormData.videoURL : ""}
                    onChange={(e) =>
                      setVideoFormData({
                        ...videoFormData,
                        videoURL: e.target.value,
                      })
                    }
                    className="w-full"
                    required
                  />
                </div>
                {/* Video URL */}
              </div>
              {/* Thumbnail and Video URL Inputbox  */}

              {/* Video Duration and Age range Inputbox */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-8">
                {/* Video Duration */}
                <div className="flex flex-col gap-2 w-full">
                  <Label
                    value="Video Duration"
                    htmlFor="video-duration"
                    className="text-xs"
                  />

                  <TextInput
                    sizing="sm"
                    id="video-duration"
                    placeholder="Add video length in minutes"
                    value={
                      videoFormData.videoDuration
                        ? videoFormData.videoDuration
                        : ""
                    }
                    onChange={(e) =>
                      setVideoFormData({
                        ...videoFormData,
                        videoDuration: e.target.value,
                      })
                    }
                    className="w-full"
                    required
                  />
                </div>
                {/* Video Duration */}

                {/* Age Range */}
                <div className="flex flex-col gap-2 w-full">
                  <Label
                    value="Age Range"
                    className="text-xs"
                    htmlFor="age-range"
                  />
                  <div
                    className="flex flex-wrap items-center gap-3"
                    id="age-range"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="U9-U12"
                        value="U9 - U12"
                        onChange={handleAgeRangeInput}
                        className="cursor-pointer"
                        checked={
                          videoFormData.ageRange &&
                          videoFormData.ageRange.includes("U9 - U12")
                        }
                      />
                      <Label htmlFor="U9-U12" className="text-xs font-[Inter]">
                        U9 - U12
                      </Label>
                    </div>
                    <div className="flex items-center gap-2" id="age-range">
                      <Checkbox
                        id="U13-U18"
                        value="U13 - U18"
                        onChange={handleAgeRangeInput}
                        className="cursor-pointer"
                        checked={
                          videoFormData.ageRange &&
                          videoFormData.ageRange.includes("U13 - U18")
                        }
                      />
                      <Label htmlFor="U13-U18" className="text-xs font-[Inter]">
                        U13 - U18
                      </Label>
                    </div>
                    <div className="flex items-center gap-2" id="age-range">
                      <Checkbox
                        id="U19-U25"
                        value="U19 - U25"
                        onChange={handleAgeRangeInput}
                        className="cursor-pointer"
                        checked={
                          videoFormData.ageRange &&
                          videoFormData.ageRange.includes("U19 - U25")
                        }
                      />
                      <Label htmlFor="U19-U25" className="text-xs font-[Inter]">
                        U19 - U25
                      </Label>
                    </div>
                  </div>
                </div>
                {/* Age Range */}
              </div>
              {/* Video Duration and Age range Inputbox */}

              {/* Required equipments and Players Inputbox */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-8">
                {/* Equipments */}
                <div className="flex flex-col gap-2 w-full">
                  <Label
                    value="Required Equipment"
                    className="text-xs"
                    htmlFor="required-equipment"
                  />
                  <div
                    className="flex flex-wrap items-center gap-3"
                    id="required-equipment"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rq-football"
                        value="Footballs"
                        onChange={handleRequiredEquipmentsInput}
                        className="cursor-pointer"
                        checked={
                          videoFormData.requiredEquipments &&
                          videoFormData.requiredEquipments.includes("Footballs")
                        }
                      />
                      <Label
                        htmlFor="rq-football"
                        className="text-xs font-[Inter]"
                      >
                        Footballs
                      </Label>
                    </div>
                    <div className="flex items-center gap-2" id="age-range">
                      <Checkbox
                        id="rq-bibs"
                        value="Bibs"
                        onChange={handleRequiredEquipmentsInput}
                        className="cursor-pointer"
                        checked={
                          videoFormData.requiredEquipments &&
                          videoFormData.requiredEquipments.includes("Bibs")
                        }
                      />
                      <Label htmlFor="rq-bibs" className="text-xs font-[Inter]">
                        Bibs
                      </Label>
                    </div>
                    <div className="flex items-center gap-2" id="age-range">
                      <Checkbox
                        id="rq-cones"
                        value="Cones"
                        onChange={handleRequiredEquipmentsInput}
                        className="cursor-pointer"
                        checked={
                          videoFormData.requiredEquipments &&
                          videoFormData.requiredEquipments.includes("Cones")
                        }
                      />
                      <Label
                        htmlFor="rq-cones"
                        className="text-xs font-[Inter]"
                      >
                        Cones
                      </Label>
                    </div>
                    <div className="flex items-center gap-2" id="age-range">
                      <Checkbox
                        id="rq-goals"
                        value="Goals"
                        onChange={handleRequiredEquipmentsInput}
                        className="cursor-pointer"
                        checked={
                          videoFormData.requiredEquipments &&
                          videoFormData.requiredEquipments.includes("Goals")
                        }
                      />
                      <Label
                        htmlFor="rq-goals"
                        className="text-xs font-[Inter]"
                      >
                        Goals
                      </Label>
                    </div>
                  </div>
                </div>
                {/* Equipments */}

                {/* Players */}
                <div className="flex flex-col gap-2 w-full">
                  <Label
                    value="Required Players"
                    className="text-xs"
                    htmlFor="required-players"
                  />
                  <div
                    className="flex flex-wrap items-center gap-3"
                    id="required-players"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rq-1-p"
                        value="1"
                        onChange={handleRequiredPlayersInput}
                        className="cursor-pointer"
                        checked={
                          videoFormData.requiredPlayers &&
                          videoFormData.requiredPlayers.includes("1")
                        }
                      />
                      <Label htmlFor="rq-1-p" className="text-xs font-[Inter]">
                        1
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rq-2-p"
                        value="2"
                        onChange={handleRequiredPlayersInput}
                        className="cursor-pointer"
                        checked={
                          videoFormData.requiredPlayers &&
                          videoFormData.requiredPlayers.includes("2")
                        }
                      />
                      <Label htmlFor="rq-2-p" className="text-xs font-[Inter]">
                        2
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rq-3-p"
                        value="3"
                        onChange={handleRequiredPlayersInput}
                        className="cursor-pointer"
                        checked={
                          videoFormData.requiredPlayers &&
                          videoFormData.requiredPlayers.includes("3")
                        }
                      />
                      <Label htmlFor="rq-3-p" className="text-xs font-[Inter]">
                        3
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rq-4-p"
                        value="4"
                        onChange={handleRequiredPlayersInput}
                        className="cursor-pointer"
                        checked={
                          videoFormData.requiredPlayers &&
                          videoFormData.requiredPlayers.includes("4")
                        }
                      />
                      <Label htmlFor="rq-4-p" className="text-xs font-[Inter]">
                        4
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rq-8-p"
                        value="8"
                        onChange={handleRequiredPlayersInput}
                        className="cursor-pointer"
                        checked={
                          videoFormData.requiredPlayers &&
                          videoFormData.requiredPlayers.includes("8")
                        }
                      />
                      <Label htmlFor="rq-8-p" className="text-xs font-[Inter]">
                        8
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rq-11-p"
                        value="11"
                        onChange={handleRequiredPlayersInput}
                        className="cursor-pointer"
                        checked={
                          videoFormData.requiredPlayers &&
                          videoFormData.requiredPlayers.includes("11")
                        }
                      />
                      <Label htmlFor="rq-11-p" className="text-xs font-[Inter]">
                        11
                      </Label>
                    </div>
                  </div>
                </div>
                {/* Players */}
              </div>
              {/* Required equipments and Coaches Inputbox */}
            </div>
            {videoFormData.thumbnailURL && (
              <>
                <Button
                  gradientDuoTone="purpleToPink"
                  onClick={() => setOpenModal(true)}
                >
                  Thumbnail Review
                </Button>
                <Modal
                  show={openModal}
                  onClose={() => setOpenModal(false)}
                  className="pt-[60px] sm:pt-[70px]"
                >
                  <Modal.Header>Video Thubnail Preview</Modal.Header>
                  <Modal.Body>
                    <div className="space-y-6">
                      <img
                        src={
                          videoFormData.thumbnailURL
                            ? videoFormData.thumbnailURL
                            : imageUploadFileURL
                        }
                        alt="video thumbnail"
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
              className="text-[#333]"
              required
            />

            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              outline
              className="mt-5"
              size="md"
              pill
              disabled={isImageFileUploading}
            >
              Update
            </Button>
          </form>
        </>
      )}
    </div>
  );
}

export default UpdateVideo;
