import { createSlice } from "@reduxjs/toolkit";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createThunkCondition, parseError } from "./utils";

const initialState = {
  user: "",
  email: "",
  accessToken: "",
  role: "admin",
  homepageBgImageUrl: "",
};
const thunkCondition = createThunkCondition('auth')
// fetch all add ons from firebase
export const fetchHomepageBgImageUrl = createAsyncThunk(
  "auth/fetchHomepageBgUrl",
  async (_, { rejectWithValue }) => {
    try {
      const homepageBgImageRef = await ref(storage, 'assets/sky-bg.jpg')
      const homepageBgImageUrl = await getDownloadURL(homepageBgImageRef)

      return { homepageBgImageUrl };
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
  thunkCondition
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.displayName;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = "";
      state.email = "";
      state.accessToken = "";
    },
  },
  extraReducers: {
    [fetchHomepageBgImageUrl.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [fetchHomepageBgImageUrl.fulfilled]: (state, action) => {
      state.loading = "succeeded";
      state.homepageBgImageUrl = action.payload.homepageBgImageUrl;
    },
    [fetchHomepageBgImageUrl.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
