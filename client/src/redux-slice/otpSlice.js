import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expirationTime: 0,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    decrementExpirationTime: (state) => {
      if (state.expirationTime > 0) {
        state.expirationTime -= 1;
      }
    },
    resetExpirationTime: (state) => {
      state.expirationTime = 0;
    },
    restartExpirationTime: (state) => {
      state.expirationTime = 60;
    },
    setExpirationTime: (state, action) => {
      state.expirationTime = action.payload;
    },
  },
});

export const {
  decrementExpirationTime,
  resetExpirationTime,
  restartExpirationTime,
  setExpirationTime,
} = otpSlice.actions;

export default otpSlice.reducer;
