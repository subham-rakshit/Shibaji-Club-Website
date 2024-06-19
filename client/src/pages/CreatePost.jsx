import React, { useRef, useState } from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";

import JoditEditor from "jodit-react";

function CreatePost() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  return (
    <div className="p-3 w-full max-w-3xl mx-auto min-h-screen my-[65px] lg:mt-[76px] font-[Inter] flex flex-col justify-center">
      <div className="flex items-center justify-between gap-4 mb-2 lg:mb-5">
        <h1 className="text-center lg:text-left text-xl lg:text-3xl my-5 font-semibold">
          Create a post
        </h1>
        <img
          src="/create-post-logo.png"
          alt="post"
          className="w-[60px] lg:w-[80px] h-[60px] lg:h-[80px]"
        />
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between mb-2">
          <TextInput
            type="text"
            placeholder="Write post's title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="outfields">Outfields</option>
            <option value="one to one">One To One</option>
            <option value="goalkeepers">Goalkeepers</option>
            <option value="practice matchs">Practice Matchs</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 mb-2 lg:mb-5">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            outline
            size="sm"
            className="font-[Inter]"
          >
            Upload
          </Button>
        </div>
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />

        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          className="w-full max-w-[500px] mx-auto mt-5"
        >
          Publish
        </Button>
      </form>
    </div>
  );
}

export default CreatePost;
