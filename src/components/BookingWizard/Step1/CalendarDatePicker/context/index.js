import { createContext } from "react";
import dayjs from 'dayjs'
import { getPageRowData } from "../utils";

export const initialState = {
  currentPage: {
    date: dayjs(),
    rows: getPageRowData(dayjs())
  },
  selectedDate: dayjs(),
}

export const CalendarDatePickerContext = createContext(initialState)