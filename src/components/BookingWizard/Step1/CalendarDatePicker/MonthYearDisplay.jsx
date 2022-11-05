import { useContext } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { CalendarDatePickerContext } from "./context";
import { updateCurrentPage } from "./context/actions";

const MonthYearDisplay = () => {
  const [state, dispatch] = useContext(CalendarDatePickerContext);
  const { currentPage } = state;

  const changeCalendarPage = (date) => dispatch(updateCurrentPage(date));

  const goToNextMonth = () =>
    changeCalendarPage(currentPage.date.add(1, "month"));
  const goToPrevMonth = () =>
    changeCalendarPage(currentPage.date.subtract(1, "month"));

  const month = currentPage.date.format("MMMM");
  const year = currentPage.date.format("YYYY");

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3  my-3">
          <div className="d-flex justify-content-between align-items-center gap-3">
            <GoArrowLeft onClick={goToPrevMonth} />
            <div>
              {month} {year}
            </div>
            <GoArrowRight onClick={goToNextMonth} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthYearDisplay;
