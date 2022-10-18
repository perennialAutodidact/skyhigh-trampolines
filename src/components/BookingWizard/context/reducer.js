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
    selectedAddOns,
    bookedRooms,
    disabledStartTimes,
    roomAvailabilities,
    quantity,
    addOns,
    addOnId,
    subTotal,
    tax,
    grandTotal,
    paymentStatus,
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
        rooms: createInitialRoomState(rooms),
      };

    // sets the available ticket counts for each time for each room
    case "SET_ROOM_AVAILABILITIES":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.id !== roomId
            ? room
            : {
                ...room,
                availabilities: roomAvailabilities,
              }
        ),
      };

    // sets the disabled times for a room
    case "SET_DISABLED_TIMES":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.id !== roomId
            ? room
            : {
                ...room,
                disabledStartTimes,
              }
        ),
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

    // adds add on quantities to each add on
    case "SET_INITIAL_ADDON_STATE":
      return {
        ...state,
        addOns: createInitialAddOnState(addOns),
      };

    case "UPDATE_BOOKED_ROOMS":
      return {
        ...state,
        formData: {
          ...formData,
          bookedRooms,
        },
      };

    case "UPDATE_SELECTED_ADDONS":
      return {
        ...state,
        formData: {
          ...formData,
          selectedAddOns,
        },
      };

    case "SET_ADDON_QUANTITY":
      return {
        ...state,
        addOns: state.addOns.map((addOn) =>
          addOn.id !== addOnId ? addOn : { ...addOn, quantity }
        ),
      };

    case "UPDATE_SUBTOTAL":
      return {
        ...state,
        formData: {
          ...formData,
          subTotal,
        },
      };

    case "UPDATE_TAX":
      return {
        ...state,
        formData: {
          ...formData,
          tax,
        },
      };

    case "UPDATE_GRAND_TOTAL":
      return {
        ...state,
        formData: {
          ...formData,
          grandTotal,
        },
      };

    case "UPDATE_PAYMENT_STATUS":
      return {
        ...state,
        paymentStatus,
      };

    case "CHECKOUT_SUCCESS":
      const { confirmationId } = action.payload;

      return {
        ...state,
        confirmationId,
      };

    default:
      return state;
  }
};
