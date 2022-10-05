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
  async ({ bookingData, bookingId }, { rejectWithValue }) => {
    const callUpdateBooking = httpsCallable(functions, "updateBooking");
    console.log("updating booking");
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
    bookingData: null,
  },
  reducers: {
    updateBookingData: (state, action) => {
      state.bookingData = {
        ...state.bookingData,
        ...action.payload,
      };
    },
    clearBookingData: (state, action) => {
      state.bookingData = null;
    },
  },
  extraReducers: {
    [createBooking.pending]: (state, action) => {
      state.loading = "pending";
    },
    [createBooking.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      state.bookingInProgress = {
        id: action.payload.data.bookingId,
      };
      state.bookingData = null;
    },
    [createBooking.rejected]: (state, action) => {
      state.loading = "rejected";
      state.bookingData = null;
      state.error = action.payload.error;
    },

    [updateBooking.pending]: (state, action) => {
      state.loading = "pending";
    },
    [updateBooking.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      state.bookingData = null;
    },
    [updateBooking.rejected]: (state, action) => {
      state.loading = "rejected";
      state.bookingData = null;
      state.error = action.payload.error;
    },
  },
});

export const { updateBookingData, clearBookingData } = bookingsSlice.actions;

export default bookingsSlice.reducer;
