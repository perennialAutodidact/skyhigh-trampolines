import { useContext } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { CalendarDatePickerContext } from "./context";
import { updateCalendarPage } from "./context/actions";

const MonthYearDisplay = () => {
  const [state, dispatch] = useContext(CalendarDatePickerContext);
  const { calendarPage } = state;

  const changeCalendarPage = (date) => dispatch(updateCalendarPage(date));

  const goToNextMonth = () => changeCalendarPage(calendarPage.add(1, "month"));
  const goToPrevMonth = () =>
    changeCalendarPage(calendarPage.subtract(1, "month"));

  const month = calendarPage.format("MMMM");
  const year = calendarPage.format("YYYY");

  return (
    <div className="col-4 offset-4 my-3 d-flex justify-content-between align-items-center gap-3">
      <GoArrowLeft onClick={goToPrevMonth} />
      <div>
        {month} {year}
      </div>
      <GoArrowRight onClick={goToNextMonth} />
    </div>
  );
};

export default MonthYearDisplay;
