import React from "react";
import dayjs from "dayjs";
import { BsCalendar } from "react-icons/bs";

const DateDisplay = ({ date }) => {
  const formattedDate = date ? dayjs(date).format("MMMM DD, YYYY") : null;

  return (
    <div className="d-flex align-items-center gap-2">
      <BsCalendar /> <span>{formattedDate}</span>
    </div>
  );
};

export default DateDisplay;
