import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createThunkCondition } from "./utils";

const thunkCondition = createThunkCondition("bookings");

const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async () => {},
  thunkCondition
);

const updateBooking = createAsyncThunk(
  "bookings/updateBooking",
  async () => {},
  thunkCondition
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    loading: "idle",
    error: null,
    bookingInProgress: {},
  },
  reducers: {},
  extraReducers: {
    [createBooking.pending]: (state, action) => {
      state.bookingInProgress = {
        ...state.bookingInProgress,
        ...action.payload,
      };
    },
  },
});

export const { updateBookingInProgress, clearBookingInProgress } =
  bookingsSlice.actions;

export default bookingsSlice.reducer;
