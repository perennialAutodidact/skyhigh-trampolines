import { createContext } from "react";

export const initialState = {
  percentComplete: 0,
  currentStep: 1,
  totalSteps: 6
}

export const BookingWizardContext = createContext(initialState)