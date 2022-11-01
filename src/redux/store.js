import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import counterReducer from "./counterSlice";
import roomsReducer from "./roomsSlice";
import productsReducer from "./productsSlice";
import addOnsReducer from "./addOnsSlice";
import stripeReducer from "./stripeSlice";
import bookingsReducer from "./bookingsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    rooms: roomsReducer,
    products: productsReducer,
    addOns: addOnsReducer,
    stripe: stripeReducer,
    bookings: bookingsReducer,
  },
  devTools: true,
});
