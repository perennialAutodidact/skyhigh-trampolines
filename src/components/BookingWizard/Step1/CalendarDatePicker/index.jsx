import React, { useReducer } from "react";
import dayjs from "dayjs";
import { CalendarDatePickerContext, initialState } from "./context";
import { calendarDatePickerReducer } from "./context/reducer";
import MonthYearDisplay from "./MonthYearDisplay";
import WeekdayLabels from "./WeekdayLabels";
import CalendarPage from "./CalendarPage";
import { useEffect } from "react";
import { setSelectedDate } from "./context/actions";

const CalenderDatePicker = ({ selectedDate }) => {
  const [state, dispatch] = useReducer(calendarDatePickerReducer, initialState);

  useEffect(() => {
    dispatch(setSelectedDate(dayjs(selectedDate)));
  }, [selectedDate]);

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
