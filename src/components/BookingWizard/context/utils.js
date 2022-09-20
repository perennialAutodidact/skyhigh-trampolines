import _ from "lodash";

export const getPageRowData = (currentPageDate) => {
  const calendarRows = 6;
  const calendarCols = 7;
  const totalCells = calendarRows * calendarCols;

  const firstDayOfMonth = currentPageDate.startOf("month");
  const firstDayOfMonthIndex = firstDayOfMonth.day(); // SUN - SAT (0-6)

  // find the date in the upper left cell
  const calendarPageStartDate = currentPageDate
    .startOf("month")
    .subtract(firstDayOfMonthIndex, "days");

  let pageDates = [];
  let date = calendarPageStartDate;

  for (let i = 0; i < totalCells; i++) {
    pageDates.push(date);
    date = date.add(1, "day");
  }

  // split dates into rows
  pageDates = _.chunk(pageDates, calendarCols);

  return pageDates;
};
