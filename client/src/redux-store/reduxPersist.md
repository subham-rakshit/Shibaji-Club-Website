# ** NOTE FOR Persist Data in Local Storage **

## When we save our authenticated user's data in state, then when we reload we realise that state data are gone because of state environment crashed.

## So, fix that prblem, we need to install [redux-persist] npm for persist that data in localstorage.

# Step1 = We need to create a combine reducers in {rootReducer} variable. There we are passing our created reducer eg. [userReducer] through combineReducers() method which comes from "@reduxjs/toolkit"

//? import { combineReducers } from "@reduxjs/toolkit";
//? const rootReducer = combineReducers({
//? user: userReducer,
//? });

# Step2 = Create a "persistReducer" function. [persistReducer] is a function provided by the "redux-persist" library, which helps to persist and rehydrate a Redux store. This can be particularly useful for saving the Redux state to a storage mechanism (like localStorage or AsyncStorage) so that the state can be restored when the user revisits the application. This fuction have two arguments [eg. persistConfig and rootReducer]. persistedConfig = What type of config u want into your localStorage. rootReducer = from which reducer's data u want to persist.

//? import { persistReducer } from "redux-persist";
//? const persistedReducer = persistReducer(persistConfig, rootReducer);

# Step3 = We have to config our persistance. There we are passing [key: "key_name", version: 1, storage]. key = We can see this key_name in our browser localstorage. storage = redux store. The store to be persisted.

//? import storage from "redux-persist/lib/storage";
//? const persistConfig = {
//? key: "root",
//? storage,
//? version: 1,
//? };

# Step4 = We have to create store in redux-toolkit with "persistedReducer".

//? import { configureStore } from "@reduxjs/toolkit";
//? export const store = configureStore({
//? reducer: persistedReducer,
//? middleware: (getDefaultMiddleware) =>
//? getDefaultMiddleware({ serializableCheck: false }),
//? });

# Step5 = Also we have to add middleware in while configureStore (creating a store). This middleware prevent the default error of persisting data in localstorage.

//? export const store = configureStore({
//? reducer: persistedReducer,
//! middleware: (getDefaultMiddleware) =>
//! getDefaultMiddleware({ serializableCheck: false }),
//? });

## [serializableCheck] = When using Redux Toolkit, the serializableCheck middleware ensures that all actions and state are serializable. This is important because non-serializable values can cause issues when persisting state or during time-travel debugging. However, some actions related to redux-persist involve non-serializable values, so they need to be ignored. If u don't use this middleware u get an error.

# Step6 = You have to export store that presisted by persistStore() method.

//? import { persistStore } from "redux-persist";
//? export const persistor = persistStore(store);

# Step7 = Now after creating persistStore, now we have to add this store in main.jsx file to access all of the components in App.jsx file.

//? import React from "react";
//? import ReactDOM from "react-dom/client";
//? import App from "./App.jsx";
//? import { Provider } from "react-redux";
//? import { store, persistor } from "./redux-store/store.js";
//? import { PersistGate } from "redux-persist/integration/react";

//? ReactDOM.createRoot(document.getElementById("root")).render(
//? <PersistGate persistor={persistor}>
//? <Provider store={store}>
//? <App />
//? </Provider>
//? </PersistGate>
//? );

## [PersistGate] = The PersistGate component from redux-persist is used to delay the rendering of your app's UI until the persisted state has been retrieved and rehydrated into the Redux store. This is important to ensure that your app does not render with default or empty state values before the persisted state is available.
