import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    status: STATUSES.IDLE,
    error: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = STATUSES.LOADING;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = STATUSES.IDLE;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.error.response || "Some error occured while logging in.";

      })
      .addCase(logout.pending, (state) => {
        state.status = STATUSES.LOADING;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
        localStorage.removeItem("user");
        state.status = STATUSES.IDLE;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentUser } = userSlice.actions;

export const login = createAsyncThunk("user/login", async (inputs) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      inputs,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data.message)
    throw error;
  }
});

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/logout",
      null,
      { withCredentials: true }
    );
    console.log(response);
    console.log("Logged out");
  } catch (error) {

    throw error;
  }
});

export default userSlice.reducer;
