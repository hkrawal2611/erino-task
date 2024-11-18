import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUsers } from "../thunks/adduser";
import { deleteUser } from "../thunks/deleteuser";

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  extraReducers(builder) {
    // fetch
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // Add
    builder.addCase(addUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((user) => user.id !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = userSlice.reducer;
