import React from "react";
import dayjs from "dayjs";

const WeekdayLabels = () => {
  const formatCode = "ddd";
  const getDayLabel = (dayNumber, format) => dayjs().day(dayNumber).format(format);

  return (
    <tr className="row">
      {[...new Array(7)].map((_, dayNumber) => (
        <th className="col p-0 text-uppercase">
          {getDayLabel(dayNumber, formatCode)}
        </th>
      ))}
    </tr>
  );
};

export default WeekdayLabels;
