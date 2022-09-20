import { createContext } from "react";
import dayjs from 'dayjs'

export const initialState = {
  currentDate: dayjs(),
  selectedDate: dayjs(),
  calendarDates: []
}

export const CalendarDatePickerContext = createContext(initialState)