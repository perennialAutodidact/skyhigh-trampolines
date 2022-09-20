export const setCurrentPageDate = (date) => ({
  type: "SET_CURRENT_PAGE_DATE",
  payload: { date },
});

export const setSelectedDate = (date) => ({
  type: "SET_SELECTED_DATE",
  payload: { date },
});
