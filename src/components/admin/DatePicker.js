import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { formatDate, today } from "../../utils/dateUtils";

import { useState } from "react";

//
export const DatePicker = () => {
  const [showDate, setShowDate] = useState(today);

  const datePlusOrMinus = (numericalOperation) => {
    const date = new Date(showDate);
    numericalOperation === `+`
      ? date.setDate(date.getDate() + 1)
      : date.setDate(date.getDate() - 1);
    return setShowDate(formatDate(date));
  };

  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button
        type="button"
        className="btn btn-light"
        onClick={() => datePlusOrMinus("-")}
      >
        <FiChevronLeft />
      </button>
      <input
        type="date"
        value={showDate}
        onChange={(e) => setShowDate(e.target.value)}
      />

      <button
        onClick={() => datePlusOrMinus("+")}
        type="button"
        className="btn btn-light"
      >
        <FiChevronRight />
      </button>
    </div>
  );
};
