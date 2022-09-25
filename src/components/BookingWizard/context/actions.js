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

export const setInitialRoomState = (rooms) => {
  return {
    type: "SET_INITIAL_ROOM_STATE",
    payload: { rooms },
  };
};

export const setSelectedStartTime = (roomId, selectedStartTime) => {
  return {
    type: "SET_SELECTED_START_TIME",
    payload: {
      roomId,
      selectedStartTime,
    },
  };
};

export const setProductQuantity = (roomId, productId, quantity) => {
  return {
    type: "SET_PRODUCT_QUANTITY",
    payload: {
      roomId,
      productId,
      quantity,
    },
  };
};
