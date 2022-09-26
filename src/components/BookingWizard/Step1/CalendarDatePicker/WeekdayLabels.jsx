import React from "react";
import dayjs from "dayjs";

const WeekdayLabels = () => {
  const formatCode = "ddd";
  const dayLabels = [...new Array(7)].map((_, dayNumber) =>
    dayjs().day(dayNumber).format(formatCode)
  ); // ['SUN', 'MON', 'TUE', ...]

  return (
    <tr className="row">
      {dayLabels.map((dayLabel) => (
        <th className="col p-0 text-uppercase" key={dayLabel}>
          {dayLabel}
        </th>
      ))}
    </tr>
  );
};

export default WeekdayLabels;
