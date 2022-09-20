import { useContext } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { CalendarDatePickerContext } from "./context";
import { updateCurrentPage } from "./context/actions";

const MonthYearDisplay = () => {
  const [state, dispatch] = useContext(CalendarDatePickerContext);
  const { currentPage } = state;

  const changeCalendarPage = (date) => dispatch(updateCurrentPage(date));

  const goToNextMonth = () => changeCalendarPage(currentPage.date.add(1, "month"));
  const goToPrevMonth = () =>
    changeCalendarPage(currentPage.date.subtract(1, "month"));

  const month = currentPage.date.format("MMMM");
  const year = currentPage.date.format("YYYY");

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
