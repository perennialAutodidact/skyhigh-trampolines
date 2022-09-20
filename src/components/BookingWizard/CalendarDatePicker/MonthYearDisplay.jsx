import { useContext } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { CalendarDatePickerContext } from "./context";
import { setCurrentPageDate } from "./context/actions";

const MonthYearDisplay = () => {
  const [state, dispatch] = useContext(CalendarDatePickerContext);
  const { currentPageDate } = state;

  const changePageDate = (date) => dispatch(setCurrentPageDate(date));

  const goToNextMonth = () => changePageDate(currentPageDate.add(1, "month"));
  const goToPrevMonth = () =>
    changePageDate(currentPageDate.subtract(1, "month"));

  const month = currentPageDate.format("MMMM");
  const year = currentPageDate.format("YYYY");

  return (
    <div className="col-12 my-3 d-flex justify-content-center align-items-center gap-3">
      <GoArrowLeft onClick={goToPrevMonth} />
      <div>
        {month} {year}
      </div>
      <GoArrowRight onClick={goToNextMonth} />
    </div>
  );
};

export default MonthYearDisplay;
