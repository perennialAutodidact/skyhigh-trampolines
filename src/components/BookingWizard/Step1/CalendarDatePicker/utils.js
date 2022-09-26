import _ from "lodash";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

/**
 * Returns an array containing DayJS date objects for all dates that should be rendered on the current calendarPage
 *
 * @param {dayjs.DayJS} calendarPage - dayjs date object representing the current calendar page
 * @returns dayjs.DayJS[]
 */
export const getPageRowData = (calendarPage) => {
  const calendarRows = 6;
  const calendarCols = 7;
  const totalCells = calendarRows * calendarCols;

  const firstDayOfMonth = calendarPage.startOf("month");
  const firstDayOfMonthIndex = firstDayOfMonth.day(); // SUN - SAT (0-6)

  // find the date in the upper left cell
  const calendarPageStartDate = calendarPage
    .startOf("month")
    .subtract(firstDayOfMonthIndex, "days");

  let pageDates = [];
  let date = calendarPageStartDate;

  for (let i = 0; i < totalCells; i++) {
    pageDates.push(date);
    date = date.add(1, "day");
  }

  // split dates into rows
  const pageRowData = _.chunk(pageDates, calendarCols);

  return pageRowData;
};

/**
 * Returns a boolean indicating whether or not a calendar date is selectable.
 *
 * Returns false if:
 *
 *     * "the current calendar page is before the current month"
 *     * "the dateToCheck is before today's date"
 *     * "the dateToCheck is on the current page, but isn't in the calendarPageDate's month"
 *
 * @param {dayjs.DayJS} calendarPageDate -  the current calendar page
 * @param {dayjs.DayJS} selectedDate -  the currently selected date
 * @param {dayjs.DayJS} dateToCheck - the date to be checked for selectability
 * @returns boolean
 */
export const dateIsSelectable = (
  calendarPageDate,
  selectedDate,
  dateToCheck
) => {
  let startDate;
  let endDate;

  if (
    (calendarPageDate.month() === dayjs().month() &&
      calendarPageDate.year() === dayjs().year() &&
      calendarPageDate.month() === selectedDate.month()) ||
    dateToCheck.isBefore(dayjs())
  ) {
    startDate = dayjs().subtract(1, "day");
    endDate = selectedDate.endOf("month");
  } else {
    startDate = calendarPageDate.startOf("month");
    endDate = calendarPageDate.endOf("month");
  }
  // fourth argument "[" incicates inclusion of startDate
  return dateToCheck.isBetween(startDate, endDate, null, "[");
};

/**
 * Returns a boolean indicating if the selectedDate's month and day equal those of the dateToCheck
 * @param {dayjs.DayJS} calendarPageDate -  the current calendar page
 * @param {dayjs.DayJS} selectedDate -  the currently selected date
 * @param {dayjs.DayJS} dateToCheck - the date to check if is selected
 * @returns boolean
 */
export const dateIsSelected = (calendarPageDate, selectedDate, dateToCheck) => {
  return (
    dateToCheck.month() === selectedDate.month() &&
    dateToCheck.date() === selectedDate.date() && 
    calendarPageDate.month() === selectedDate.month()
    );
};
