export const productSelectReducer = (state, action) => {
  const {
    rooms,
    setFormValue,
    roomId,
    productId,
    selectedStartTime,
    quantity,
  } = action.payload;

  switch (action.type) {
    case "SET_INITIAL_ROOM_STATE":
      return {
        ...state,
        rooms,
      };

    case "ADD_FORM_VALUE_SETTER":
      return {
        ...state,
        setFormValue,
      };

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
                    ? room.products
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
