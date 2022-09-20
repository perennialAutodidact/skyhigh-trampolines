import React, { useReducer } from "react";
import { CalendarDatePickerContext, initialState } from "./context";
import { calendarDatePickerReducer } from "./context/reducer";
import MonthYearDisplay from "./MonthYearDisplay";

const CalenderDatePicker = () => {
  const [state, dispatch] = useReducer(calendarDatePickerReducer, initialState);

  return (
    <CalendarDatePickerContext.Provider value={[state, dispatch]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <MonthYearDisplay />
          </div>
        </div>
      </div>
    </CalendarDatePickerContext.Provider>
  );
};

export default CalenderDatePicker;
