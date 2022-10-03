import dayjs from "dayjs";
import { createContext } from "react";
import { getHalfHourIncrementStrings } from "./utils";

export const initialState = {
  percentComplete: 0,
  currentStep: 1,
  totalSteps: 6,
  formData: {
    date: dayjs().format("YYYY-MM-DD"),
    waiverAgreed: false,
    signatureImageData: "",
    addOns: [],
    fullName: "George Harrison",
    email: "iamthewalrus@abbeyroad.com",
    address: "123 Faux St.",
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
    grandTotal: 0,
    tax: 0,
    SALES_TAX_RATE: 0.065,
    TRANSACTION_FEE: 400,
  },
  startTimes: getHalfHourIncrementStrings("9:00", "16:30"),
  setFormValue: null, // function to set values in the BookingWizard
};

export const BookingWizardContext = createContext(initialState);
