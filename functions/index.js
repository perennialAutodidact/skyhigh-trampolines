const functions = require("firebase-functions");
const stripeConfig = require("./stripeConfig");
const payments = require("./payments");
const bookings = require("./bookings");

exports.createPaymentIntent = payments.createPaymentIntent;
exports.handleStripeEvent = stripeConfig.handleStripeEvent;
exports.writeBookingFromStripeEvent = bookings.writeBookingFromStripeEvent;
