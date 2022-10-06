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
      const booking = await callCreateBooking(bookingData);
      console.log("booking", booking.data.bookingId);
      return booking;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  thunkCondition
);

export const updateBooking = createAsyncThunk(
  "bookings/updateBooking",
  async (bookingData, { rejectWithValue }) => {
    const callUpdateBooking = httpsCallable(functions, "updateBooking");
    try {
      return await callUpdateBooking(bookingData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
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
    },
    [createBooking.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      state.bookingInProgress = {
        id: action.payload.data.bookingId,
      };
    },
    [createBooking.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.error;
    },

    [updateBooking.pending]: (state, action) => {
      state.loading = "pending";
    },
    [updateBooking.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
    },
    [updateBooking.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.error;
    },
  },
});

export default bookingsSlice.reducer;
