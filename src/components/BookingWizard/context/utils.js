import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { PRODUCT_DISPLAY_ORDER } from "../../../constants";
dayjs.extend(isSameOrBefore);
/**
 *
 * @param {number} x
 * @param {number} y
 * @returns {number} x as a percent of y
 *
 * formatPercent(3,10) => 33.333
 */
export const formatPercent = (x, y) => Math.round((x / y) * 100);

/**
 *
 * @param {room[]} rooms Array of Room data from the database
 * @returns {room[]} The array of rooms, adding attributes for the selectedStartTime,
 *          an array of disabled times based on ticket availabilty
 *          and a quantity for each of the room's products
 */
export const createInitialRoomState = (rooms) =>
  rooms.map((room) => ({
    ...room,
    products: room.products
      .map((product) => ({
        ...product,
        quantity: 0,
      }))
      .sort(
        (p1, p2) =>
          PRODUCT_DISPLAY_ORDER[p1.duration] -
          PRODUCT_DISPLAY_ORDER[p2.duration]
      ),
    selectedStartTime: "",
    disabledStartTimes: [],
  }));

/**
 *
 * @param {addOn[]} addOns Array of AddOn data from the database
 * @returns {addOn[]} The addOns array with a quantity added for each
 */
export const createInitialAddOnState = (addOns) =>
  addOns.map((addOn) => ({
    ...addOn,
    quantity: 0,
  }));

/**
 *
 * @param {string} startTime
 * @param {string} endTime
 * @returns {string[]} Array of time strings in half-hour increments from the startTime to the endTime
 *
 * ["9:00", "9:30", "10:00", ...]
 */
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

/**
 *
 * @param {product} product A product from the databse
 * @returns {number} The product's quantity multiplied by the product's price
 */
const getProductTotal = (product) => product.quantity * product.price;

/**
 *
 * @param {addOn} addOn An addOn from the database
 * @returns {number} The addOn's quantity multiplied by the addOn's price
 */
const getAddOnTotal = (addOn) => addOn.quantity * addOn.price;

/**
 *
 * @param {room} room A single room from the database
 * @returns {boolean} Boolean indicating if the room has at least one
 *                    product whose quantity is greater than zero
 */
const hasSelectedProducts = (room) =>
  room && room.products.some((product) => product.quantity > 0);

/**
 *
 * @param {product[]} products Array of products within a room
 * @returns {product[]} Array of products whose quantities are greater than zero
 */
const selectedProducts = (products) =>
  products
    .filter((product) => product.quantity > 0)
    .map((product) => ({ ...product, totalPrice: getProductTotal(product) }));

/**
 *
 * @param {room[]} rooms Array of room data from the database
 * @returns {room[]} Array of rooms which have at least one
 *                   product with a quantity greater than zero
 */
export const getBookedRooms = (rooms) =>
  rooms
    .filter((room) => hasSelectedProducts(room))
    .map((room) => ({
      ...room,
      products: selectedProducts(room.products),
      headCount: getHeadCount(room),
    }));

/**
 *
 * @param {addOn[]} addOns Array of AddOns from the database
 * @returns {addOn[]} Array of addOns who have a quantity greater than zero
 */
export const getSelectedAddOns = (addOns) =>
  addOns
    .filter((addOn) => addOn.quantity > 0)
    .map((addOn) => ({ ...addOn, totalPrice: getAddOnTotal(addOn) }));

/**
 *
 * @param {number} amount A number representing money, probably an integer
 * @returns {number} The number as a two-digit decimal number
 *
 * toMoney(1299) => 12.99
 */
export const toMoney = (amount) => (amount.toFixed(0) / 100).toFixed(2);

/**
 *
 * @param {room} room A room from the database
 * @returns The sum of all the room's products' quantities
 */
export const getHeadCount = (room) =>
  room.products.reduce(
    (roomHeadCount, product) => roomHeadCount + product.quantity,
    0
  );

/**
 *
 * @param {room[]} rooms Array of rooms from the database
 * @returns The total head count of all rooms
 */
export const getTotalHeadCount = (rooms) =>
  rooms.reduce(
    (totalHeadCount, room) => totalHeadCount + getHeadCount(room),
    0
  );

/**
 *
 * @param {room[]} rooms Array of rooms from the database
 * @param {addOn[]} addOns Array of addOns from the database
 * @returns Sum of the total price of the booked rooms and selected addOns
 */
export const getOrderSubtotal = (rooms, addOns) =>
  getBookedRooms(rooms).reduce(
    (total, room) =>
      total +
      room.products.reduce(
        (roomTotal, product) => roomTotal + product.totalPrice,
        0
      ),
    0
  ) +
  getSelectedAddOns(addOns).reduce(
    (total, addOn) => total + addOn.totalPrice,
    0
  );

/**
 *
 * @param {roomAvailability[]} roomAvailabilities Array of objects indicating the number of available tickets at a particular time for the room
 * @returns {string[]} Array of time strings indicating which time slots have no available tickets e.g. ["9:00", "11:30", "12:00", ...]
 */
export const getDisabledTimes = (roomAvailabilities) => {
  return Object.keys(roomAvailabilities).filter((time) =>
    Object.keys(roomAvailabilities[time]).every(
      (ticketName) => roomAvailabilities[time][ticketName] === 0
    )
  );
};
