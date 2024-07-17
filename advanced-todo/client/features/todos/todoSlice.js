import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/todo", todoData, {
        withCredentials: true,
      });
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/api/v1/todo",
        {},
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.log(error.response.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTodo = createAsyncThunk(
  "todos/getTodo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/todo/${id}`,
        {},
        { withCredentials: true }
      );

      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodoData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/v1/todo/${updatedTodoData._id}`,
        updatedTodoData,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/v1/todo/${id}`,
        {},
        { withCredentials: true }
      );

      console.log(response)

      return response.data;

    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Fetch Todos reducers
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true; // Set loading state to true
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false
        state.todos = action.payload; // Update todos state with fetched data
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false
        state.error = action.payload; // Update error state with error payload
      })
      // Create Todo reducers
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true; // Set loading state to true
        state.error = null; // Clear any previous errors
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false
        state.todos.push(action.payload); // Add newly created todo to todos array
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false
        state.error = action.payload; // Update error state with error payload
      })
      // Update Todo reducers
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true; // Set loading state to true
        state.error = null; // Clear any previous errors
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false
        const updatedTodo = action.payload; // Updated todo object
        const index = state.todos.findIndex(
          (todo) => todo._id === updatedTodo._id
        );
        if (index !== -1) {
          state.todos[index] = updatedTodo; // Update todo in the todos array
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false
        state.error = action.payload; // Update error state with error payload
      })
      // Get Todo reducers
      .addCase(getTodo.pending, (state) => {
        state.isLoading = true; // Set loading state to true
        state.error = null; // Clear any previous errors
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false
        state.todos = [action.payload]; // Update todos state with fetched single todo
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false
        state.error = action.payload; // Update error state with error payload
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const idToDelete = action.payload._id;
        state.todos = state.todos.filter((todo) => todo._id !== idToDelete);
      }).addCase(deleteTodo.rejected, (state, action)=>{
        state.isLoading = false;
        state.error = null;
      })
});

// Export the reducer
export default todoSlice.reducer;
