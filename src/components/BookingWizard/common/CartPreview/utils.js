
export const getOrderSubtotal = (rooms, addOns) =>
  rooms.reduce(
    (total, room) =>
      total +
      room.products.reduce(
        (roomTotal, product) => roomTotal + product.totalPrice,
        0
      ),
    0
  ) + addOns.reduce((total, addOn) => total + addOn.totalPrice, 0);
