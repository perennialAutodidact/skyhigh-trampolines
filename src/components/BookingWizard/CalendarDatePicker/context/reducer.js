import { getPageRowData } from "../utils";

export const calendarDatePickerReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_PAGE":
      const { date } = action.payload;
      return {
        ...state,
        currentPage: {
          date,
          rows: getPageRowData(date),
        },
      };

    case "SET_SELECTED_DATE":
      return {
        ...state,
        selectedDate: action.payload.date,
      };

    default:
      return state;
  }
};
