import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSilder } from "../redux-slice/sliderSlice";

function DashToggleButton() {
  const { isSlide } = useSelector((state) => state.slider);
  const dispatch = useDispatch();

  return (
    <label
      htmlFor="check"
      className={`${
        isSlide === "true" ? "bg-green-300" : "bg-red-300"
      } cursor-pointer relative w-[70px] h-[30px] rounded-full`}
    >
      <input
        type="checkbox"
        id="check"
        className="sr-only peer shadow-md shadow-slate-400"
        onChange={() => dispatch(toggleSilder())}
      />
      <span
        className={`w-[24px] h-[24px] bg-white absolute rounded-full left-1 top-[3px] ${
          isSlide === "true" && "left-[41px]"
        } transition-all duration-300`}
      ></span>
    </label>
  );
}

export default DashToggleButton;
