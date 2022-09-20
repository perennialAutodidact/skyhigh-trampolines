import { createContext } from "react";
import dayjs from 'dayjs'

export const initialState = {
  currentPage: {
    date: dayjs(),
    rows: []
  },
  selectedDate: dayjs(),
}

export const CalendarDatePickerContext = createContext(initialState)