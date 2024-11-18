import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addUsers = createAsyncThunk("user/add", async (user) => {
  const res = await axios.post("http://localhost:4000/contact/add-contact", {
    first_name: user.name,
    last_name: "",
    email: user.email,
    phone_number: user.contact,
    company:"",
    job_title:"",
  });
  return res.data;
});
