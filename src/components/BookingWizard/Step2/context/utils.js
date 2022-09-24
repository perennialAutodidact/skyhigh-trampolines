export const createInitialRoomState = (rooms) =>
  rooms.map((room) => ({
    id: room.id,
    products: room.products.map((product) => ({
      id: product.id,
      name: product.name,
      quantity: 0,
    })),
    selectedStartTime: "",
    disabledStartTimes: ["9:00", "9:30", "16:00"],
  }));
