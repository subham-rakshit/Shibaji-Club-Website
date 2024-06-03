import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const globalState = useSelector((state) => state.user);
  console.log(globalState);
  return (
    <div className="text-red-500 min-h-screen bg-red-300 mt-[65px] lg:mt-[75px]">
      Home
    </div>
  );
};

export default Home;
