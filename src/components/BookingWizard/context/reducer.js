export const wizardReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FORM':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};
