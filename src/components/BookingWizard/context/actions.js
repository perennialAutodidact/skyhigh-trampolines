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

export const setInitialAddOnState = (addOns) => ({
  type: "SET_INITIAL_ADDON_STATE",
  payload: { addOns },
});

export const updateBookedRooms = (bookedRooms) => ({
  type: "UPDATE_BOOKED_ROOMS",
  payload: { bookedRooms },
});

export const updateSelectedAddOns = (selectedAddOns) => ({
  type: "UPDATED_SELECTED_ADDONS",
  payload: { selectedAddOns },
});

export const setSelectedStartTime = (roomId, selectedStartTime) => ({
  type: "SET_SELECTED_START_TIME",
  payload: {
    roomId,
    selectedStartTime,
  },
});

export const setRoomAvailabilities = (roomId, roomAvailabilities) => ({
  type: "SET_ROOM_AVAILABILITIES",
  payload: { roomId, roomAvailabilities },
});

export const setDisabledTimes = (roomId, disabledStartTimes) => ({
  type: "SET_DISABLED_TIMES",
  payload: { roomId, disabledStartTimes },
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
  type: "SET_ADDON_QUANTITY",
  payload: {
    addOnId,
    quantity,
  },
});

export const updateSubtotal = (subTotal) => ({
  type: "UPDATE_SUBTOTAL",
  payload: { subTotal },
});

export const updateTax = (tax) => ({
  type: "UPDATE_TAX",
  payload: { tax },
});

export const updateGrandTotal = (grandTotal) => ({
  type: "UPDATE_GRAND_TOTAL",
  payload: { grandTotal },
});
