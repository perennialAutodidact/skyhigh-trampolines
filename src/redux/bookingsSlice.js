import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createThunkCondition } from "./utils";
import { getDocs, query, orderBy, limit } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { bookingsCollection, functions } from "../firebase/client";

const thunkCondition = createThunkCondition("bookings");

export const getBookingsList = createAsyncThunk(
  "bookings/getBookingsList",
  async (_, { rejectWithValue }) => {
    try {
      const bookingsQuery = query(
        bookingsCollection,
        // orderBy("dateCreated.seconds", "desc")
        limit(1)
      );
      return await getDocs(bookingsQuery).then((bookingDocs) => {
        let bookingsData = [];
        bookingDocs.forEach((doc) => {
          let { dateCreated, ...bookingData } = doc.data();
          const { seconds, nanoseconds } = dateCreated;
          dateCreated = seconds + nanoseconds * 1e9;
          console.log({ bookingData });
          console.log(dateCreated);
          bookingsData.push({
            dateCreated: dateCreated,
            id: doc.id,
            ...bookingData,
          });
          console.log(bookingsData);

          return bookingsData;
        });
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  thunkCondition
);

export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    const callCreateBooking = httpsCallable(functions, "createBooking");

    try {
      const booking = await callCreateBooking(bookingData);
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

export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async (bookingId, { rejectWithValue }) => {
    const callCancelBooking = httpsCallable(functions, "cancelBooking");
    try {
      return await callCancelBooking({ bookingId });
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
    [getBookingsList.pending]: (state, action) => {
      state.loading = "pending";
    },
    [getBookingsList.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      state.bookings = action.payload;
    },
    [getBookingsList.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload;
    },

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

    [cancelBooking.pending]: (state, action) => {
      state.loading = "pending";
    },
    [cancelBooking.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.bookingInProgress = null;
    },
    [cancelBooking.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.error;
    },
  },
});

export default bookingsSlice.reducer;
