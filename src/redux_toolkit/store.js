import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { thunk } from 'redux-thunk';

import userList from "./userList";
import userSelected from "./userSelected";
import { weatherSlice } from "./weatherSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"]
};

const weatherAppReducer = combineReducers({
  users: userList,
  userSelected: userSelected,
  [weatherSlice.reducerPath]: weatherSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, weatherAppReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk,
      serializableCheck: false,
    }).concat(weatherSlice.middleware),
});

export const persistor = persistStore(store);
