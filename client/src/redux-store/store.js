import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../redux-slice/userSlice";
import registrationReducer from "../redux-slice/registerSlice";
import themeReducer from "../redux-slice/themeSlice";
import sliderReducer from "../redux-slice/sliderSlice";
import searchPageSliderReducer from "../redux-slice/searchSliderSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Step1:
const rootReducer = combineReducers({
  user: userReducer,
  register: registrationReducer,
  theme: themeReducer,
  slider: sliderReducer,
  searchSlider: searchPageSliderReducer,
});

// Step3:
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Step2:
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Step4:
export const store = configureStore({
  reducer: persistedReducer,
  // Step5:
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Step6:
export const persistor = persistStore(store);

//! ** NOTE FOR Persist Data in Local Storage **

//! GO TO [reduxPersist.md] file to better understand.
