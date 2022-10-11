import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createThunkCondition } from "./utils";
import {
  getDocs,
  query,
  orderBy,
  getDoc,
  doc,
  startAfter,
  limit,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import {
  bookingsCollection,
  receiptsCollection,
  waiversCollection,
  db,
  functions,
} from "../firebase/client";
import dayjs from "dayjs";

const thunkCondition = createThunkCondition("bookings");

const getBookings = async (pageQuery) => {
  try {
    return await getDocs(pageQuery).then((bookingDocs) => {
      let bookingsData = [];
      bookingDocs.forEach(async (bookingDoc) => {
        let booking = { id: bookingDoc.id, ...bookingDoc.data() };
        let { dateCreated } = booking;
        dateCreated = dayjs.unix(dateCreated.seconds).format();

        bookingsData.push({
          ...booking,
          dateCreated,
        });
      });

      return bookingsData;
    });
  } catch (error) {}
};

const getReceipts = async (bookings) => {
  try {
    return await Promise.all(
      bookings.map(async (booking) => {
        let { receiptId } = booking;
        if (receiptId) {
          let receipt = await getDoc(doc(db, "receipts", receiptId)).then(
            (doc) => doc.data()
          );
          booking["total"] = receipt.grandTotal;
        }

        return booking;
      })
    );
  } catch (error) {
    return error;
  }
};

export const getBookingsList = createAsyncThunk(
  "bookings/getBookingsList",
  async (_, { getState, rejectWithValue }) => {
    let { perPage } = getState().bookings;

    try {
      let pageQuery = query(
        bookingsCollection,
        orderBy("dateCreated", "desc"),
        limit(perPage)
      );

      let bookings = await getBookings(pageQuery);

      bookings = await getReceipts(bookings);

      return { bookings };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  thunkCondition
);

export const getPrevBookingPage = createAsyncThunk(
  "bookings/getPrevPage",
  async (_, { getState, rejectWithValue }) => {
    try {
    } catch (error) {}
  }
);

export const getNextBookingPage = createAsyncThunk(
  "bookings/getNextPage",
  async (_, { getState, rejectWithValue }) => {
    try {
      let { page, perPage, pageStartIds, isLastPage } = getState().bookings;
      let fetchedBookings = null;
      if (pageStartIds.length === page && !isLastPage) {
        let startId = pageStartIds[page - 1];
        let firstBooking = await getDoc(doc(db, "bookings", startId));
        let pageQuery = query(
          bookingsCollection,
          orderBy("dateCreated", "desc"),
          startAfter(firstBooking),
          limit(perPage)
        );

        fetchedBookings = await getBookings(pageQuery);

        fetchedBookings = await getReceipts(fetchedBookings);
      }
      return { fetchedBookings };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
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
  }
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
    allBookings: [],
    pageStartIds: [],
    page: 1,
    perPage: 10,
    isLastPage: false,
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
      let { bookings, newPage } = action.payload;
      state.loading = "succeeded";
      state.allBookings = state.allBookings.concat(bookings);
      state.bookings = bookings;
      state.pageStartIds = state.pageStartIds.concat(
        bookings[bookings.length - 1].id
      );
    },
    [getBookingsList.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload;
    },

    [getPrevBookingPage.pending]: (state, action) => {
      state.loading = "pending";
    },
    [getPrevBookingPage.fulfilled]: (state, action) => {
      let { page, perPage } = state;
      let firstIndex = (page - 2) * perPage;
      let lastIndex = firstIndex + perPage;
      state.loading = "succeeded";
      state.bookings = state.allBookings.slice(firstIndex, lastIndex);
      state.isLastPage = false;
      state.page = state.page - 1;
    },
    [getPrevBookingPage.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload;
    },

    [getNextBookingPage.pending]: (state, action) => {
      state.loading = "pending";
    },
    [getNextBookingPage.fulfilled]: (state, action) => {
      let { fetchedBookings, bookings } = action.payload;
      let { page, perPage } = state;
      let firstIndex = page * perPage;
      if (fetchedBookings?.length > 0) {
        state.allBookings = state.allBookings.concat(fetchedBookings);
        state.pageStartIds = state.pageStartIds.concat(
          fetchedBookings[fetchedBookings.length - 1].id
        );
        state.bookings = fetchedBookings;
        if (fetchedBookings.length < perPage) {
          state.isLastPage = true;
        }
      } else {
        state.bookings = state.allBookings.slice(
          firstIndex,
          firstIndex + perPage
        );
      }
      state.page = state.page + 1;
      state.loading = "succeeded";
    },
    [getNextBookingPage.rejected]: (state, action) => {
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
