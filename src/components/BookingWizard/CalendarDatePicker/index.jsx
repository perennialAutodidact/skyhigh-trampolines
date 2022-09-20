import React, { useEffect, useReducer } from "react";
import { CalendarDatePickerContext, initialState } from "./context";
import { calendarDatePickerReducer } from "./context/reducer";
import MonthYearDisplay from "./MonthYearDisplay";
import WeekdayLabels from "./WeekdayLabels";
import CalendarPage from "./CalendarPage";

const CalenderDatePicker = ({setFormValue}) => {
  const [state, dispatch] = useReducer(calendarDatePickerReducer, initialState);
  const { selectedDate } = state;

  useEffect(()=>{
    setFormValue('date', selectedDate.format('YYYY-MM-DD'))
  },[selectedDate, setFormValue])

  return (
    <CalendarDatePickerContext.Provider value={[state, dispatch]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <MonthYearDisplay />
            <table className="table-responsive-sm container-fluid text-center">
              <thead>
                <WeekdayLabels />
              </thead>
              <tbody>
                <CalendarPage />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CalendarDatePickerContext.Provider>
  );
};

export default CalenderDatePicker;
