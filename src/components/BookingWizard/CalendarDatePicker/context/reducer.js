import { getPageRowData } from "../utils";

export const calendarDatePickerReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_PAGE":
      const { date } = action.payload;
      return {
        ...state,
        currentPage: {
          date,
          rowData: getPageRowData(date),
        },
      };

    default:
      return state;
  }
};
