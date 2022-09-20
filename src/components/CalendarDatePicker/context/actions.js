export const setPageDate = (date) => ({
  type: "SET_CURRENT_DATE",
  payload: { date },
});

export const setSelectedDate = (date) => ({
  type: "SET_SELECTED_DATE",
  payload: { date },
});
