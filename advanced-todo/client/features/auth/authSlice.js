import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebaseConfig";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  isLoading: false,
  error: null,
};

// Signup thunk
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/auth/signup", userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/auth/login", credentials, {
        withCredentials: true,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const signUpWithGoogle = createAsyncThunk(
  "auth/googleSignIn",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/auth/googleSignin",
        credentials,
        { withCredentials: true }
      );

      // Return user data to the slice
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Logout thunk
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/api/v1/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/v1/user/${userData.id}`, userData, {
        withCredentials: true,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/v1/users/${passwordData.userId}/password`,
        passwordData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup handlers
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("Loading Sign Up...");
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("Sign Up Error: " + state.error);
      })
      // Login handlers
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("Loading Log In...");
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.userData;
        
        localStorage.setItem("user", JSON.stringify(action.payload.userData));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("Log In Error: " + state.error);
      })
      // Logout handlers
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      }) // Google Sign-In handlers
      .addCase(signUpWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("Loading Google Sign In...");
      })
      .addCase(signUpWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.userData;
        localStorage.setItem("user", JSON.stringify(action.payload.userData));
      })
      .addCase(signUpWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("Google Sign In Error: " + state.error);
      });
  },
});

export default authSlice.reducer;
