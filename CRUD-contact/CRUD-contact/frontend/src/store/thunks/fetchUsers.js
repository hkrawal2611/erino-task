import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("fetch/users", async () => {
  const res = await axios.get("http://localhost:4000/contact/list");
  return res.data;
});
