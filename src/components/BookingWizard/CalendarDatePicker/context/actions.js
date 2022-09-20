export const updateCalendarPage = (date) => ({
  type: "UPDATE_CALENDAR_PAGE",
  payload: { date },
});

export const setSelectedDate = (date) => ({
  type: "SET_SELECTED_DATE",
  payload: { date },
});
