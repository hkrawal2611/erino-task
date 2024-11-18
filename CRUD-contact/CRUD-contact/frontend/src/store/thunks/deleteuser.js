import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUser = createAsyncThunk("user/delete", async (userId) => {
  await axios.post(`http://localhost:4000/contact/delete-contact/${userId}`);
  return userId;
});
