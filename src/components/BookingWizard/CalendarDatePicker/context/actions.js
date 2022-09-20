export const updateCurrentPage = (date) => ({
  type: "UPDATE_CURRENT_PAGE",
  payload: { date },
});

export const setSelectedDate = (date) => ({
  type: "SET_SELECTED_DATE",
  payload: { date },
});
