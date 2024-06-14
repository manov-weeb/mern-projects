import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: null,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) =>{
      state.loading = true;
      state.error = false;
    },
    deleteUserSuccess: (state) =>{
      state.currentUser = null;
      state.error = false;
      state.loading = false;
    },
    deleteUserFailure: (state, action) =>{
      
      state.error = action.payload;
      state.loading = false;
    },
    signout: (state)=>{
      state.currentUser = null,
      state.error = false;
      state.loading = false;
    }
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signout
} = userSlice.actions;
export default userSlice.reducer;
