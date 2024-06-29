import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSlide: "false",
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    toggleSilder: (state) => {
      state.isSlide = state.isSlide === "false" ? "true" : "false";
    },
  },
});

export const { toggleSilder } = sliderSlice.actions;

export default sliderSlice.reducer;
