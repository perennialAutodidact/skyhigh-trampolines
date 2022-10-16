export const createThunkCondition = (sliceName) => ({
  condition: (_, { getState, extra }) => {
    const state = getState();
    const slice = state[sliceName];

    const fetchStatus = slice.loading;
    const error = slice.error;
    if (fetchStatus !== "idle" && fetchStatus !== "succeeded" && !error) {
      // Already fetched or in progress, don't need to re-fetch
      return false;
    }
  },
});

export const parseError = (error, fallbackMessaage) => {
  const { code, message } = error;

  if (code && message) {
    error = { code, message };
  } else if (error) {
    error = { message: error };
  } else {
    error = { message: "An error occurred." };
  }
  return error;
};
