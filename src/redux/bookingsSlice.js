import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createThunkCondition } from "./utils";
import {
  getDocs,
  query,
  orderBy,
  where,
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
  roomsCollection,
} from "../firebase/client";
import dayjs from "dayjs";
import { sortBookingsByRoom } from "../utils";

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

const getRooms = () => {
  try {
    return getDocs(roomsCollection).then((roomDocs) => {
      let roomsData = [];
      roomDocs.forEach((roomDoc) => {
        roomsData.push({ id: roomDoc.id, ...roomDoc.data() });
      });
      return roomsData;
    });
  } catch (error) {
    return error;
  }
};

export const getFirstBookingPage = createAsyncThunk(
  "bookings/getBookingsList",
  async (_, { getState, rejectWithValue }) => {
    let { perPage } = getState().bookings;

    try {
      let pageQuery = query(
        bookingsCollection,
        orderBy("dateCreated", "desc"),
        limit(perPage)
      );

      let bookingsPage = await getBookings(pageQuery);

      bookingsPage = await getReceipts(bookingsPage);

      return { bookingsPage };
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

export const getBookingsByDate = createAsyncThunk(
  "bookings/getBookingsByDate",
  async (date, { getState, fulfillWithValue, rejectWithValue }) => {
    try {
      let bookingsQuery = query(
        bookingsCollection,
        where("status", "in", ["pending", "complete"]),
        where("date", "==", date)
      );
      let bookings = await getBookings(bookingsQuery);

      let rooms = await getRooms();
      bookings = sortBookingsByRoom(bookings, rooms);
      console.log({ date, bookings });
      return fulfillWithValue({ date, bookings });
    } catch (error) {
      // console.log(error);
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
    bookingsPage: [],
    allBookings: [],
    pageStartIds: [],
    page: 1,
    perPage: 10,
    isLastPage: false,
    bookingsByDate: {},
    loading: "idle",
    error: null,
    bookingInProgress: null,
  },
  reducers: {},
  extraReducers: {
    // GET FIRST BOOKING PAGE
    [getFirstBookingPage.pending]: (state, action) => {
      state.loading = "pending";
    },
    [getFirstBookingPage.fulfilled]: (state, action) => {
      let { bookingsPage } = action.payload;
      state.loading = "succeeded";
      state.allBookings = state.allBookings.concat(bookingsPage);
      state.bookingsPage = bookingsPage;
      state.pageStartIds = state.pageStartIds.concat(
        bookingsPage[bookingsPage.length - 1].id
      );
    },
    [getFirstBookingPage.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload;
    },

    // GET PREV BOOKING PAGE
    [getPrevBookingPage.pending]: (state, action) => {
      state.loading = "pending";
    },
    [getPrevBookingPage.fulfilled]: (state, action) => {
      let { page, perPage } = state;
      let firstIndex = (page - 2) * perPage;
      let lastIndex = firstIndex + perPage;
      state.bookingsPage = state.allBookings.slice(firstIndex, lastIndex);
      state.isLastPage = false;
      state.page = state.page - 1;
      state.loading = "succeeded";
    },
    [getPrevBookingPage.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload;
    },

    // GET NEXT BOOKING PAGE
    [getNextBookingPage.pending]: (state, action) => {
      state.loading = "pending";
    },
    [getNextBookingPage.fulfilled]: (state, action) => {
      let { fetchedBookings } = action.payload;
      let { page, perPage } = state;
      let firstIndex = page * perPage;
      if (fetchedBookings?.length > 0) {
        state.allBookings = state.allBookings.concat(fetchedBookings);
        state.pageStartIds = state.pageStartIds.concat(
          fetchedBookings[fetchedBookings.length - 1].id
        );
        state.bookingsPage = fetchedBookings;
        if (fetchedBookings.length < perPage) {
          state.isLastPage = true;
        }
      } else {
        state.bookingsPage = state.allBookings.slice(
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

    // GET BOOKINGS BY DATE
    [getBookingsByDate.pending]: (state, action) => {
      state.loading = "pending";
    },
    [getBookingsByDate.fulfilled]: (state, action) => {
      let { date, bookings } = action.payload;
      state.bookingsByDate = {
        ...state.bookingsByDate,
        [date]: bookings,
      };
      state.loading = "idle";
    },
    [getBookingsByDate.rejected]: (state, action) => {
      console.log("FAILED");
      state.loading = "failed";
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
      state.error = action.payload;
    },

    [updateBooking.pending]: (state, action) => {
      state.loading = "pending";
    },
    [updateBooking.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
    },
    [updateBooking.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload;
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
      state.error = action.payload;
    },
  },
});

export default bookingsSlice.reducer;
