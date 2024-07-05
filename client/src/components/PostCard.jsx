import React, { useState } from "react";
import { Link } from "react-router-dom";

function PostCard({ eachPost }) {
  const [isClick, setIsClick] = useState(false);
  return (
    <div className="w-full sm:max-w-[300px] border dark:border-gray-600 group relative h-[400px] overflow-hidden rounded-lg transition-all duration-500">
      <img
        src={eachPost.blogImage}
        alt={eachPost.title}
        className={`h-[260px] w-full object-cover group-hover:h-[200px] ${
          isClick && "h-[200px]"
        } transition-all duration-500 z-20`}
        onClick={() => setIsClick((prev) => !prev)}
      />

      <div className="p-3 flex flex-col gap-2">
        <p className="text-sm font-semibold font-[Inter] line-clamp-2">
          {eachPost.title}
        </p>
        <span className="italic text-xs font-[Inter] mb-5">
          {eachPost.category}
        </span>
        <Link
          to={`/post/${eachPost.slug}`}
          className="z-10 bottom-[-500px] group-hover:bottom-0 absolute left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-tr-lg rounded-bl-lg font-[Inter] m-3"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
