import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchSlide: "false",
};

const searchPageSliderSlice = createSlice({
  name: "searchSlider",
  initialState,
  reducers: {
    toggleSearchPageSilder: (state) => {
      state.isSearchSlide = state.isSearchSlide === "false" ? "true" : "false";
    },
  },
});

export const { toggleSearchPageSilder } = searchPageSliderSlice.actions;

export default searchPageSliderSlice.reducer;
