import React from "react";

const formatDate = (date) => date.toISOString().split("T")[0];
const DatePicker = () => {
  const today = formatDate(new Date());
  const [showDate, setShowDate] = useState(today);
  console.log({ showDate });

  // refactor these to one fn witih the offset day value (+ -)
  const minusOneDay = () => {
    const date = new Date(showDate);
    date.setDate(date.getDate() - 1);
    return setShowDate(formatDate(date));
  };

  const plusOneDay = () => {
    const date = new Date(showDate);
    date.setDate(date.getDate() + 1);
    return setShowDate(formatDate(date));
  };

  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button type="button" className="btn btn-info" onClick={minusOneDay}>
        <i className="bi bi-chevron-left text-primary" />
      </button>
      <input
        type="date"
        value={showDate}
        onChange={(e) => setShowDate(e.target.value)}
      />

      <button onClick={plusOneDay} type="button" className="btn btn-info">
        <i className="bi bi-chevron-right text-primary" />
      </button>
    </div>
  );
};
export default DatePicker;
