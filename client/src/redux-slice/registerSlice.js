import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registeredUser: null,
  registrationError: null,
  registrationLoading: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registrationInitialRender: (state) => {
      state.registrationError = null;
      state.registrationLoading = false;
    },
    registrationStart: (state) => {
      state.registrationLoading = true;
      state.registrationError = null;
    },
    registrationSuccess: (state, action) => {
      state.registeredUser = action.payload;
      state.registrationLoading = false;
      state.registrationError = null;
    },
    registrationFailure: (state, action) => {
      state.registrationLoading = false;
      state.registrationError = action.payload;
    },
    userVerified: (state) => {
      state.registeredUser = null;
      state.registrationError = null;
      state.registrationLoading = false;
    },
  },
});

export const {
  registrationInitialRender,
  registrationStart,
  registrationSuccess,
  registrationFailure,
  userVerified,
} = registerSlice.actions;

export default registerSlice.reducer;
