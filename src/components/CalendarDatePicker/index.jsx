import React, { useReducer } from "react";
import { CalendarDatePickerContext, initialState } from "./context";
import { calendarDatePickerReducer } from "./context/reducer";

const CalenderDatePicker = () => {
  const [state, dispatch] = useReducer(calendarDatePickerReducer, initialState);

  return (
    <CalendarDatePickerContext.Provider
      value={[state, dispatch]}
    ></CalendarDatePickerContext.Provider>
  );
};

export default CalenderDatePicker;
