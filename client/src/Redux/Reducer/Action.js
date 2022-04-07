import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const userActions={
    current: createAsyncThunk("users/currentuser", async () => {
        const options = {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        };
        try {
          let response = await axios.get("/user/current", options);
          return await response;
        } catch (error) {
          console.log(error);
        }
      }),
}