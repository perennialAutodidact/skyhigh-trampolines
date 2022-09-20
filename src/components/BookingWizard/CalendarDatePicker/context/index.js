import { createContext } from "react";
import dayjs from 'dayjs'

export const initialState = {
  calendarPage: dayjs(),
  selectedDate: dayjs(),
  pageRowData: []
}

export const CalendarDatePickerContext = createContext(initialState)