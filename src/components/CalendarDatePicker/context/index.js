import { createContext } from "react";
import dayjs from 'dayjs'

export const initialState = {
  currentPageDate: dayjs(),
  selectedDate: dayjs(),
  pageCellDates: []
}

export const CalendarDatePickerContext = createContext(initialState)