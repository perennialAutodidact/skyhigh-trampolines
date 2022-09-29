const getProductTotal = (product) => product.quantity * product.price;

const getAddOnTotal = (addOn) => addOn.quantity * addOn.price;

const hasSelectedProducts = (room) =>
  room && room.products.some((product) => product.quantity > 0);

const selectedProducts = (products) =>
  products
    .filter((product) => product.quantity > 0)
    .map((product) => ({ ...product, totalPrice: getProductTotal(product) }));

export const getBookedRooms = (rooms) =>
  rooms
    .filter((room) => hasSelectedProducts(room))
    .map((room) => ({
      ...room,
      products: selectedProducts(room.products),
    }));

export const getSelectedAddOns = (addOns) =>
  addOns
    .filter((addOn) => addOn.quantity > 0)
    .map((addOn) => ({ ...addOn, totalPrice: getAddOnTotal(addOn) }));

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
