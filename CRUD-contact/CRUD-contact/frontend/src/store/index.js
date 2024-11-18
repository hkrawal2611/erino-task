import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export * from "./thunks/adduser";
export * from "./thunks/fetchUsers";
export * from "./thunks/edituser";
