export const productSelectReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INITIAL_ROOM_STATE':
      return {
        ...state,
        rooms: action.payload.rooms
      }
    default:
      return state;
  }
};
