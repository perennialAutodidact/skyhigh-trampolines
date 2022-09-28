export const updateForm = (partialFormData) => ({
  type: "UPDATE_FORM",
  payload: partialFormData,
});

export const setProgressBarStep = (step) => ({
  type: "UPDATE_PROGRESS_BAR",
  payload: {
    step,
  },
});

export const setInitialRoomState = (rooms) => ({
  type: "SET_INITIAL_ROOM_STATE",
  payload: { rooms },
});

export const setSelectedStartTime = (roomId, selectedStartTime) => ({
  type: "SET_SELECTED_START_TIME",
  payload: {
    roomId,
    selectedStartTime,
  },
});

export const setProductQuantity = (roomId, productId, quantity) => ({
  type: "SET_PRODUCT_QUANTITY",
  payload: {
    roomId,
    productId,
    quantity,
  },
});

export const setAddOnQuantity = (addOnId, quantity) => ({
  type: "SET_ADD_ON_QUANTITY",
  payload: {
    addOnId,
    quantity,
  },
});
