const formatPercent = (x, y) => Math.round(x / y) * 100;

export const wizardReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FORM":
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    case "UPDATE_PROGRESS_BAR":
      const { step } = action.payload;
      const { totalSteps } = state;
      return {
        ...state,
        currentStep: step,
        percentComplete: formatPercent(step, totalSteps),
      };
    default:
      return state;
  }
};
