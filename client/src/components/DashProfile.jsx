import { useSelector } from "react-redux";
import { Input } from "../components";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "flowbite-react";

function DashProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const imageFileRef = useRef();

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
    console.log("Upload Image ...");
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="font-[Inter] text-[#333] font-semibold text-xl text-center my-3">
        Profile
      </h1>
      <form className="flex flex-col">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={imageFileRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-xl overflow-hidden rounded-full mb-3 md:mb-7"
          onClick={() => imageFileRef.current.click()}
        >
          <img
            src={imageFileURL ? imageFileURL : `${"/profile-logo.jpg"}`}
            alt="user"
            className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
          />
        </div>
        <div className="flex flex-col md:flex-row md:gap-3 items-center">
          <Input
            labelText="Username"
            placeholder="Firstname Lastname"
            defaultValue={currentUser.username}
          />
          <Input
            labelText="Email"
            placeholder="example@example.com"
            defaultValue={currentUser.email}
          />
        </div>
        <div className="flex flex-col md:flex-row md:gap-3 items-center">
          <Input
            labelText="Phone Number"
            placeholder="+91 0000000000"
            defaultValue={currentUser.phone}
          />
          <Input
            labelText="Address"
            placeholder="Your address"
            defaultValue={currentUser.address}
          />
        </div>
        <Input
          type="password"
          placeholder="********"
          labelText="New password"
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          className="mt-7 font-[Inter]"
        >
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between items-center mt-3 text-xs font-[Inter] font-normal">
        <span className="cursor-pointer hover:font-semibold">
          Delete Account
        </span>
        <span className="cursor-pointer hover:font-semibold">Sign Out</span>
      </div>
    </div>
  );
}

export default DashProfile;
