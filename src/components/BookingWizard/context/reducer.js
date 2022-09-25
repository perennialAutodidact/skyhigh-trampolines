import { formatPercent, createInitialRoomState } from "./utils";

export const wizardReducer = (state, action) => {
  const { rooms, roomId, productId, selectedStartTime, quantity } =
    action.payload;
    
  switch (action.type) {
    case "UPDATE_FORM":
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    case "UPDATE_PROGRESS_BAR":
      const { step } = action.payload;
      const { totalSteps } = state;
      return {
        ...state,
        currentStep: step,
        percentComplete: formatPercent(step, totalSteps),
      };

    // adds product quantities, selectedStartTime and disabledStartTimes to each room
    case "SET_INITIAL_ROOM_STATE":
      return {
        ...state,
        rooms: createInitialRoomState(rooms),
      };

    // sets the selected start time for the room
    case "SET_SELECTED_START_TIME":
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

    // sets the quantity value for a particular product
    case "SET_PRODUCT_QUANTITY":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.id !== roomId
            ? room
            : {
                ...room,
                products: room.products.map((product) =>
                  product.id !== productId
                    ? product
                    : {
                        ...product,
                        quantity,
                      }
                ),
              }
        ),
      };
    default:
      return state;
  }
};
