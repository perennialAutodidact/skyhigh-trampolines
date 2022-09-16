import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  email: "",
  accessToken: "",
  role: "admin",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.displayName;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      console.log(
        `User authenticated? ${state.user} and role is ${state.role}`
      );
    },
    logout: (state) => {
      state.user = "";
      state.email = "";
      state.accessToken = "";

      console.log(`user logged out`, state.user);
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
