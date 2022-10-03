import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createThunkCondition } from "./utils";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase/client";

const thunkCondition = createThunkCondition("bookings");

export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    const callCreateBooking = httpsCallable(functions, "createBooking");

    try {
      return await callCreateBooking(bookingData);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  thunkCondition
);

export const updateBooking = createAsyncThunk(
  "bookings/updateBooking",
  async ({ bookingData, bookingId }, { rejectWithValue }) => {
    const callUpdateBooking = httpsCallable(functions, "updateBooking");
    try {
      return await callUpdateBooking({ bookingData, bookingId });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  thunkCondition
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    loading: "idle",
    error: null,
    bookingInProgress: null,
  },
  reducers: {},
  extraReducers: {
    [createBooking.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [createBooking.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      state.bookingInProgress = action.payload;
    },
    [createBooking.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload;
    },
  },
});

export default bookingsSlice.reducer;
