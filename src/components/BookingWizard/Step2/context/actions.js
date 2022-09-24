import { createInitialRoomState } from "./utils";

export const setInitialRoomState = (rooms) => {
  return {
    type: "SET_INITIAL_ROOM_STATE",
    payload: { rooms: createInitialRoomState(rooms) },
  };
};
