import { createInitialRoomState } from "./utils";

export const setInitialRoomState = (rooms) => {
  return {
    type: "SET_INITIAL_ROOM_STATE",
    payload: { rooms: createInitialRoomState(rooms) },
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

export const addFormValueSetter = (setFormValue) => {
  return {
    type: "ADD_FORM_VALUE_SETTER",
    payload: { setFormValue },
  };
};
