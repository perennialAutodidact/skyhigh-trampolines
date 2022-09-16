export const updateForm = (partialFormData) => ({
  type: 'UPDATE_FORM',
  payload: partialFormData
})

export const setProgressBarStep = (step) => ({
  type: 'UPDATE_PROGRESS_BAR',
  payload: {
    step
  }
})