export const productSelectReducer = (state, action) => {
  switch (action.type) {
    case "SET_INITIAL_ROOM_STATE":
      return {
        ...state,
        rooms: action.payload.rooms,
      };
    case "SET_SELECTED_START_TIME":
      const { roomId, selectedStartTime } = action.payload;
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.id !== roomId
            ? room
            : {
                ...room,
                selectedStartTime,
              }
        ),
      };
    default:
      return state;
  }
};
