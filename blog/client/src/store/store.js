import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import postReducer from "./post-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export default store;
