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
