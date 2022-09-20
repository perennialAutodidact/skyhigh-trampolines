export const calendarDatePickerReducer = (state, action) => {
  switch (action.type) {
    
    case "SET_CURRENT_PAGE_DATE":
      return {
        ...state,
        currentPageDate: action.payload.date
      }

    default:
      return state;
  }
};
