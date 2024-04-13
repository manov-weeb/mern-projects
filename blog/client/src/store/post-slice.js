import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const fetchPosts = createAsyncThunk("fetch/posts", async (category = "") => {
  const fetchPostsUrl = `http://localhost:5000/api/v1/posts${category}`;
  
  
  try {
    const response = await fetch(fetchPostsUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error.message);
    throw error;
  }
});


const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    status: STATUSES.IDLE,
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.error.message;
      });
  },
});


export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
