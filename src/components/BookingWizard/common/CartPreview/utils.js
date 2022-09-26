const getProductTotal = (product) => (product.quantity * product.price);

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

export const getOrderSubtotal = (rooms) =>
  rooms.reduce(
    (total, room) =>
      total +
      room.products.reduce(
        (roomTotal, product) => roomTotal + product.totalPrice,
        0
      ),
    0
  );
