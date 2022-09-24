import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

export const getHalfHourIncrementStrings = (startTime, endTime) => {
  const [startHour, startMinute] = startTime.split(":");
  const [endHour, endMinute] = endTime.split(":");

  startTime = dayjs().hour(startHour).minute(startMinute);
  endTime = dayjs().hour(endHour).minute(endMinute);

  let halfHourIncrementStrings = [];

  let currentTime = startTime;
  while (currentTime.isSameOrBefore(endTime)) {
    let time = currentTime.format("H:mm");
    halfHourIncrementStrings.push(time);
    currentTime = currentTime.add(30, "minutes");
  }

  return halfHourIncrementStrings;
};
