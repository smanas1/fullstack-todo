"use client";
import { createSlice } from "@reduxjs/toolkit";

let item;
if (typeof window !== "undefined") {
  item = localStorage.getItem("user");
  item = JSON.parse(item);
}

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: item ? item : false,
  },
  reducers: {
    activeUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { activeUser } = userSlice.actions;
export default userSlice.reducer;
