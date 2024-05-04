"use client";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : false,
  },
  reducers: {
    activeUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { activeUser } = userSlice.actions;
export default userSlice.reducer;
