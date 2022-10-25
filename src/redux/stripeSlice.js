import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase/client";
import { createThunkCondition } from "./utils";

const thunkCondition = createThunkCondition("stripe");

export const createPaymentIntent = createAsyncThunk(
  "stripe/createPaymentIntent",
  async (data, { rejectWithValue }) => {
    const callCreatePaymentIntent = httpsCallable(
      functions,
      "createPaymentIntent"
    );

    try {
      return await callCreatePaymentIntent(data).then((res) => res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  thunkCondition
);

export const updatePaymentIntent = createAsyncThunk(
  "stripe/updatePaymentIntent",
  async ({ id, data }, { rejectWithValue }) => {
    const callUpdatePaymentIntent = httpsCallable(
      functions,
      "updatePaymentIntent"
    );

    try {
      return await callUpdatePaymentIntent({ id, data });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  thunkCondition
);

export const cancelPaymentIntent = createAsyncThunk(
  "stripe/cancelPaymentIntent",
  async (paymentIntentId, { rejectWithValue }) => {
    const callCancelPaymentIntent = httpsCallable(
      functions,
      "cancelPaymentIntent"
    );

    try {
      return await callCancelPaymentIntent(paymentIntentId);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  thunkCondition
);

const initialState = {
  paymentIntent: {
    clientSecret: null,
    id: null,
  },
  loading: "idle",
  error: null,
};

export const stripeSlice = createSlice({
  name: "stripe",
  initialState,
  reducers: {
    setStripeLoadingStatus: (state, action) => {
      state.loading = action.payload;
    },
    setStripeError: (state, action) => {
      state.error = action.payload.message;
    },
  },
  extraReducers: {
    [createPaymentIntent.pending]: (state, action) => {
      state.loading = "pending";
    },
    [createPaymentIntent.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      state.paymentIntent = action.payload;
    },
    [createPaymentIntent.rejected]: (state, action) => {
      state.loading = "rejected";
      state.paymentIntent = {
        clientSecret: null,
        id: null,
      };
      state.error = action.payload.message;
    },

    [cancelPaymentIntent.pending]: (state, action) => {
      state.loading = "pending";
    },
    [cancelPaymentIntent.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      state.paymentIntent = {
        clientSecret: null,
        id: null,
      };
    },
    [cancelPaymentIntent.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.message;
    },
  },
});

export const { setStripeLoadingStatus, setStripeError } = stripeSlice.actions;

export default stripeSlice.reducer;
