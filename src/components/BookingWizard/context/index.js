import { createContext } from "react";

export const initialState = {
  percentComplete: 0,
  currentStep: 1,
  totalSteps: 6,
  formData: {
    date: '',
    time: '',
    waiverAgreed: false,
    signatureImageData: '',
    products: [],
    addOns: [],
    customerData: {}
  }
}

export const BookingWizardContext = createContext(initialState)