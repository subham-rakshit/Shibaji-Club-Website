import React from "react";
import { useDispatch } from "react-redux";
import { FaSliders } from "react-icons/fa6";
import { toggleSearchPageSilder } from "../redux-slice/searchSliderSlice";

function SearchToggleButton() {
  const dispatch = useDispatch();

  return (
    <div>
      <FaSliders size="40" onClick={() => dispatch(toggleSearchPageSilder())} />
    </div>
  );
}

export default SearchToggleButton;
