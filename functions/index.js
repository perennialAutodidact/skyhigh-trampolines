// import * as sgMail from "@sendgrid/mail";

const admin = require("firebase-admin");
admin.initializeApp();

const stripeConfig = require("./stripeConfig");
const payments = require("./payments");
const bookings = require("./bookings");
const sendGrid = require("./sendGrid");

exports.createPaymentIntent = payments.createPaymentIntent;
exports.updatePaymentIntent = payments.updatePaymentIntent;
exports.cancelPaymentIntent = payments.cancelPaymentIntent;

exports.handleStripeEvent = stripeConfig.handleStripeEvent;

exports.updateBookingFromStripeEvent = bookings.updateBookingFromStripeEvent;
// exports.createBooking = bookings.createBooking;
// exports.updateBooking = bookings.updateBooking;
// exports.cancelBooking = bookings.cancelBooking;
