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
