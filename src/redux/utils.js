export const createThunkCondition = (sliceName) => ({
  condition: (_, { getState, extra }) => {
    const state = getState();
    const slice = state[sliceName];

    const fetchStatus = slice.loading;
    if (fetchStatus === "fulfilled" || fetchStatus === "pending") {
      // Already fetched or in progress, don't need to re-fetch
      return false;
    }
  },
});
