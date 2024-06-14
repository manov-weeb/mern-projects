import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import userReducer from "./user/userSlice.js"; // Import your user slice

// Combine all reducers into a root reducer
const rootReducer = combineReducers({ 
  user: userReducer,
});

// Configuration for persistence
const persistConfig = {
  key: "root", // Key for localStorage
  version: 1,  // Version for persistence
  storage,     // Storage engine
};

// Create a persisted reducer using the persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer, // Directly use persistedReducer
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persisted store for managing the persistence lifecycle
export const persistedStore = persistStore(store);
