import React, { useContext } from "react";
import { CalendarDatePickerContext } from "./context";
import { dateIsSelectable, dateIsSelected } from "./utils";
import { setSelectedDate } from "./context/actions";
import styles from "./CalendarDatePicker.module.scss";
import { BookingWizardContext } from "../../context";
import { updateForm } from "../../context/actions";

const CalendarRow = ({ dates }) => {
  const [wizardState, wizardDispatch] = useContext(BookingWizardContext)
  const [state, dispatch] = useContext(CalendarDatePickerContext);
  const { currentPage, selectedDate } = state;

  const handleDateSelect = (date) => {
    if (dateIsSelectable(currentPage.date, selectedDate, date)) {
      wizardDispatch(updateForm({date}))
      dispatch(setSelectedDate(date));
    }
  };

  return (
    <tr className="row">
      {dates.map((date) => (
        <td
          className="col p-0 py-1 py-md-2 d-flex justify-content-center align-items-center"
          key={date.date()}
        >
          <div
            onClick={() => handleDateSelect(date)}
            className={`
              ${styles.calendarDateNumber} 
              rounded-circle
              d-flex justify-content-center align-items-center 
              ${
                dateIsSelectable(currentPage.date, selectedDate, date)
                  ? "fw-bold"
                  : "text-muted"
              }
              ${
                dateIsSelected(currentPage.date, selectedDate, date) &&
                styles.calendarDateNumber__active
              }
              `}
          >
            {date.date()}
          </div>
        </td>
      ))}
    </tr>
  );
};

export default CalendarRow;
