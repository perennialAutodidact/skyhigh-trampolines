import { useState } from "react";
// Choose date
// With date, pull booking/capacities
// pull rooms & capacities
// pull times (open/close)
// generate column headers using times (30min divisions)
// generate row headers using rooms
// for each cell, check bookings/capacity for given room & time

// DatePicker
// https://www.npmjs.com/package/react-datepicker

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

// ! this times will change depending on the dates
// ! we should work with 24 hour clock
const tableHeaders = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
];

const sampledata = {
  "9:00": { "60min": 10, "90min": 10, "120min": 10, allDay: 10 },
  "9:30": { "60min": 10, "90min": 10, "120min": 10, allDay: 10 },
  "10:00": { "60min": 4, "90min": 4, "120min": 4, allDay: 4 },
  "10:30": { "60min": 4, "90min": 4, "120min": 4, allDay: 4 },
  "11:00": { "60min": 4, "90min": 4, "120min": 4, allDay: 4 },
  "11:30": { "60min": 10, "90min": 10, "120min": 10, allDay: 10 },
  "12:00": { "60min": 10, "90min": 10, "120min": 10, allDay: 10 },
  "12:30": { "60min": 10, "90min": 10, "120min": 10, allDay: 10 },
  "1:00": { "60min": 10, "90min": 10, "120min": 10, allDay: 10 },
  "1:30": { "60min": 10, "90min": 10, "120min": 10 },
  "2:00": { "60min": 10, "90min": 10, "120min": 10 },
  "2:30": { "60min": 10, "90min": 10, "120min": 10 },
  "3:00": { "60min": 10, "90min": 10 },
  "3:30": { "60min": 10 },
};

const rooms = [
  { capacity: 25, name: "Small" },
  { capacity: 50, name: "Big" },
];

export const MyOwnCalendar = () => {
  return (
    <>
      <DatePicker />
      <table className="table table-striped-columns">
        <thead>
          <tr>
            <td></td>
            {tableHeaders.map((elem) => (
              <th key={elem} scope="col">
                {elem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.name}>
              <th scope="row">
                {room.name} <br /> {room.capacity}
              </th>
              {tableHeaders.map((time) => {
                return <td key={time}>{sampledata[time]["60min"]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
