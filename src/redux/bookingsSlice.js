import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createThunkCondition, parseError } from "./utils";
import {
  query,
  orderBy,
  where,
  startAfter,
  limit,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import {
  bookingsCollection,
  db,
  roomsCollection,
  waiversCollection,
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
  } catch (error) {
    return error;
  }
};

const getReceipt = async (booking) => {
  try {
    let { receiptId } = booking;
    let receipt = await getDoc(doc(db, "receipts", receiptId));
    booking["receipt"] = { ...receipt.data() };
    return booking;
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

export const getBookingById = createAsyncThunk(
  "bookings/getBookingsById",
  async (id, { rejectWithValue }) => {
    try {
      let booking = await getDoc(doc(db, "bookings", id)).then((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      if (booking.waiverId) {
        const { signature } = await getDoc(
          doc(db, "waivers", booking.waiverId)
        ).then((doc) => doc.data());

        booking.signature = signature;
      }
      booking = await getReceipt(booking);

      return {
        booking,
      };
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

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

      return { bookingsPage };
    } catch (error) {
      return rejectWithValue(parseError(error));
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
      }
      return { fetchedBookings };
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

export const getBookingsByDate = createAsyncThunk(
  "bookings/getBookingsByDate",
  async (date, { getState, fulfillWithValue, rejectWithValue }) => {
    try {
      let bookingsQuery = query(
        bookingsCollection,
        where("date", "==", date),
        where("status", "in", ["pending", "complete"])
      );
      let bookings = await getBookings(bookingsQuery);

      let rooms = await getRooms();
      bookings = sortBookingsByRoom(bookings, rooms);

      return fulfillWithValue({ date, bookings });
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
  thunkCondition
);

export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const dateCreated = dayjs().format();
      const status = "pending";
      const receiptId = "";

      const bookingRef = await addDoc(bookingsCollection, {
        ...bookingData,
        dateCreated,
        status,
        receiptId,
      });

      return { bookingId: bookingRef.id };
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

export const updateBooking = createAsyncThunk(
  "bookings/updateBooking",
  async (data, { rejectWithValue }) => {
    const { bookingId, waiverSignature, ...bookingData } = data;

    try {
      if (waiverSignature) {
        const waiver = await addDoc(waiversCollection, {
          signature: waiverSignature,
          bookingId,
        });
        bookingData["waiverId"] = waiver.id;
      }

      const bookingDoc = doc(bookingsCollection, bookingId);
      await updateDoc(bookingDoc, {
        ...bookingData,
      });

      return { message: "updated" };
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const bookingDoc = doc(bookingsCollection, bookingId);
      await updateDoc(bookingDoc, {
        status: "canceled",
      });

      return { message: "success" };
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookingsPage: null,
    allBookings: [],
    pageStartIds: [],
    booking: null,
    page: 1,
    perPage: 10,
    isLastPage: false,
    bookingsByDate: {},
    loading: "idle",
    error: null,
    bookingInProgress: null,
  },
  reducers: {
    clearBooking: (state, action) => {
      state.bookingInProgress = null;
      state.loading = "idle";
    },
  },
  extraReducers: {
    // GET FIRST BOOKING PAGE
    [getFirstBookingPage.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [getFirstBookingPage.fulfilled]: (state, action) => {
      let { bookingsPage } = action.payload;
      state.loading = "succeeded";
      state.allBookings = state.allBookings.concat(bookingsPage);
      state.bookingsPage = bookingsPage;
      if (bookingsPage.length > 0) {
        state.pageStartIds = state.pageStartIds.concat(
          bookingsPage[bookingsPage.length - 1].id
        );
      }
    },
    [getFirstBookingPage.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.message;
    },

    // GET PREV BOOKING PAGE
    [getPrevBookingPage.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
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
      state.error = action.payload.message;
    },

    // GET NEXT BOOKING PAGE
    [getNextBookingPage.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
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
      state.error = action.payload.message;
    },

    // GET BOOKINGS BY DATE
    [getBookingsByDate.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [getBookingsByDate.fulfilled]: (state, action) => {
      let { date, bookings } = action.payload;
      state.bookingsByDate = {
        ...state.bookingsByDate,
        [date]: bookings,
      };
      state.loading = "succeeded";
    },
    [getBookingsByDate.rejected]: (state, action) => {
      state.loading = "failed";
      state.error = action.payload.message;
    },

    [createBooking.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [createBooking.fulfilled]: (state, action) => {
      state.loading = "succeeded";
      state.bookingInProgress = {
        id: action.payload.bookingId,
      };
    },
    [createBooking.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.message;
    },

    [updateBooking.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [updateBooking.fulfilled]: (state, action) => {
      state.loading = "succeeded";
    },
    [updateBooking.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.message;
    },

    [cancelBooking.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [cancelBooking.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.bookingInProgress = null;
    },
    [cancelBooking.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.message;
    },

    [getBookingById.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [getBookingById.fulfilled]: (state, action) => {
      state.loading = "succeeded";
      state.booking = action.payload.booking;
    },
    [getBookingById.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.message;
    },
  },
});

export default bookingsSlice.reducer;
