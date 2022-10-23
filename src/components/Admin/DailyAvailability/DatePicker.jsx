import dayjs from "dayjs";
import React, { useMemo } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const changeSelectedDate = (date) => setSelectedDate(date);

  const goToNextDay = () =>
    changeSelectedDate(dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD"));

  const goToPrevDay = () =>
    changeSelectedDate(
      dayjs(selectedDate).subtract(1, "day").format("YYYY-MM-DD")
    );

  const date = useMemo(() => dayjs(selectedDate), [selectedDate]);

  return (
    <div className="col-12 col-md-6 offset-md-3 my-3 d-flex justify-content-center align-items-center gap-3">
      <GoArrowLeft onClick={goToNextDay} />
      <div>{date.format("dddd, MMMM DD, YYYY")}</div>
      <GoArrowRight onClick={goToPrevDay} />
    </div>
  );
};

export default DatePicker;
