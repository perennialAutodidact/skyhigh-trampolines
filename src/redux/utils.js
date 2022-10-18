export const createThunkCondition = (sliceName) => ({
  condition: (_, { getState, extra }) => {
    const state = getState();
    const slice = state[sliceName];

    const fetchStatus = slice.loading;
    const error = slice.error;
    if (fetchStatus === "pending") {
      // Already in progress, don't need to re-fetch
      return false;
    }
  },
});

export const parseError = (error, fallbackMessage = "An error occured.") => {
  const { code, message } = error;

  if (code && message) {
    error = { code, message };
  } else if (error) {
    error = { message: error };
  } else {
    error = { message: fallbackMessage };
  }
  return error;
};
