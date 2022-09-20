import { getPageRowData } from "../../context/utils";

export const calendarDatePickerReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CALENDAR_PAGE":
      const {date} = action.payload
      return {
        ...state,
        calendarPage: date,
        pageRowData: getPageRowData(date)
      }

    default:
      return state;
  }
};
