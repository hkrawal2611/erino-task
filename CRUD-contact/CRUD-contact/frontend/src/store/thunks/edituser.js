import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editUser = createAsyncThunk("user/edit", async (user) => {
  const res = await axios.post(`http://localhost:4000/contact/update-contact/${user.id}`, {
    first_name: user.name,
    last_name: "",
    email: user.email,
    phone_number: user.contact,
    company:"",
    job_title:"",
  });
  return res.data;
});
