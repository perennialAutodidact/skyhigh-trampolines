// import * as sgMail from "@sendgrid/mail";

const admin = require("firebase-admin");
admin.initializeApp();

const stripeConfig = require("./stripeConfig");
const payments = require("./payments");
const bookings = require("./bookings");
const sendGrid = require("./sendGrid");

exports.handleStripeEvent = stripeConfig.handleStripeEvent;

exports.createPaymentIntent = payments.createPaymentIntent;
exports.cancelPaymentIntent = payments.cancelPaymentIntent;

exports.writeBookingFromStripeEvent = bookings.writeBookingFromStripeEvent;

exports.sendEmail = sendGrid.sendEmail;
