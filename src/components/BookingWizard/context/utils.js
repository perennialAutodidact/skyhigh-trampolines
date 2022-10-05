import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

export const formatPercent = (x, y) => Math.round((x / y) * 100);

export const createInitialRoomState = (rooms) =>
  rooms.map((room) => ({
    ...room,
    products: room.products.map((product) => ({
      ...product,
      quantity: 0,
    })),
    selectedStartTime: "",
    disabledStartTimes: ["9:00", "9:30", "16:00"],
  }));

export const createInitialAddOnState = (addOns) =>
  addOns.map((addOn) => ({
    ...addOn,
    quantity: 0,
  }));

export const getHalfHourIncrementStrings = (startTime, endTime) => {
  const [startHour, startMinute] = startTime.split(":");
  const [endHour, endMinute] = endTime.split(":");

  startTime = dayjs().hour(startHour).minute(startMinute);
  endTime = dayjs().hour(endHour).minute(endMinute);

  let halfHourIncrementStrings = [];

  let currentTime = startTime;
  while (currentTime.isSameOrBefore(endTime)) {
    let time = currentTime.format("H:mm");
    halfHourIncrementStrings.push(time);
    currentTime = currentTime.add(30, "minutes");
  }

  return halfHourIncrementStrings;
};
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
      headCount: getHeadCount(room),
    }));

export const getSelectedAddOns = (addOns) =>
  addOns
    .filter((addOn) => addOn.quantity > 0)
    .map((addOn) => ({ ...addOn, totalPrice: getAddOnTotal(addOn) }));

export const toMoney = (amount) =>
  amount && (amount.toFixed(0) / 100).toFixed(2);

export const getRoomsPaymentData = (rooms) =>
  getBookedRooms(rooms).map((room) => ({
    name: room.name,
    startTime: room.selectedStartTime,
    products: room.products.map((product) => ({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
    })),
  }));

export const getAddOnsPaymentData = (addOns) =>
  getSelectedAddOns(addOns).map((addOn) => ({
    name: addOn.name,
    price: addOn.price,
    quantity: addOn.quantity,
  }));

export const getHeadCount = (room) =>
  room.products.reduce(
    (roomHeadCount, product) => roomHeadCount + product.quantity,
    0
  );
