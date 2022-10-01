import {
  formatPercent,
  createInitialRoomState,
  createInitialAddOnState,
} from "./utils";

export const wizardReducer = (state, action) => {
  const {
    rooms,
    roomId,
    productId,
    selectedStartTime,
    quantity,
    addOns,
    addOnId,
    grandTotal,
    paymentIntent
  } = action.payload;

  const { formData } = state;
  switch (action.type) {
    case "UPDATE_FORM":
      return {
        ...state,
        formData: {
          ...formData,
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
        formData: {
          ...formData,
          rooms: createInitialRoomState(rooms),
        },
      };

    // sets the selected start time for the room
    case "SET_SELECTED_START_TIME":
      return {
        ...state,
        formData: {
          ...formData,
          rooms: formData.rooms.map((room) =>
            room.id !== roomId
              ? room
              : {
                  ...room,
                  selectedStartTime,
                }
          ),
        },
      };

    // sets the quantity value for a particular product
    case "SET_PRODUCT_QUANTITY":
      return {
        ...state,
        formData: {
          ...formData,
          rooms: formData.rooms.map((room) =>
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
        },
      };

    // adds add on quantities to each add on
    case "SET_INITIAL_ADDON_STATE":
      return {
        ...state,
        formData: {
          ...formData,
          addOns: createInitialAddOnState(addOns),
        },
      };

    case "SET_ADDON_QUANTITY":
      return {
        ...state,
        formData: {
          ...formData,
          addOns: formData.addOns.map((addOn) =>
            addOn.id !== addOnId ? addOn : { ...addOn, quantity }
          ),
        },
      };

    case "UPDATE_GRAND_TOTAL":
      return {
        ...state,
        grandTotal,
      };

      case "SET_PAYMENT_INTENT":
        return {
          ...state,
          paymentIntent
        }

    default:
      return state;
  }
};
