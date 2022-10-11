import dayjs from "dayjs";
import { createContext } from "react";
import { getHalfHourIncrementStrings } from "./utils";

export const initialState = {
  percentComplete: 0,
  currentStep: 1,
  totalSteps: 6,
  confirmationId: "",
  formData: {
    date: dayjs().format("YYYY-MM-DD"),
    waiverAgreed: false,
    signatureImageData: "",
    selectedAddOns: [],
    fullName: "",
    email: "",
    address: "",
    bookedRooms: [],
    subTotal: 0,
    tax: 0,
    grandTotal: 0,
    salesTaxRate: 0.065,
    transactionFee: 400,
  },
  startTimes: getHalfHourIncrementStrings("9:00", "16:30"),
  rooms: [
    // populate once room data is loaded
    // {
    //   id: 283748937,
    //   products: [
    //     {
    //       id: 9989898,
    //       name: 'Product 1',
    //       quantity: 0
    //     }
    //   ],
    //   selectedStartTime: "",
    //   disabledStartTimes: ["9:00", "9:30", "16:00"]
    // }
  ],
  addOns: [],
  paymentStatus: "idle",
};

export const BookingWizardContext = createContext(initialState);
