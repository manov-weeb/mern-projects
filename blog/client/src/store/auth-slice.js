import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const authSlice = createSlice({
  name: "auth",
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
      .addCase(login.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = STATUSES.IDLE;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.error.message;
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

export const { setCurrentUser } = authSlice.actions;

export const login = createAsyncThunk("user/login", async (inputs) => {
  const loginUrl = "http://localhost:5000/api/v1/auth/login";
  const loginOptions = {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(inputs),
  };

  try {
    const response = await fetch(loginUrl, loginOptions);
    const data = await response.json();
    console.log(data)
    return data;
 
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
});

export const logout = createAsyncThunk("user/logout", async () => {
  const logoutUrl = "http://localhost:5000/api/v1/auth/logout";

  try {
    await fetch(logoutUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  } catch (error) {
    console.log("Error: ", error.message);
    throw error;
  }
});

export default authSlice.reducer;
