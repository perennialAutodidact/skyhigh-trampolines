import React, { useContext } from "react";
import { CalendarDatePickerContext } from "./context";
import CalendarRow from "./CalendarRow";

const CalendarPage = ({ dates }) => {
  const [state] = useContext(CalendarDatePickerContext);
  const { currentPage } = state;

  return (
    currentPage.rows &&
    currentPage.rows.map((row, i) => (
      <CalendarRow dates={row} key={`row-${i}`} />
    ))
  );
};

export default CalendarPage;
