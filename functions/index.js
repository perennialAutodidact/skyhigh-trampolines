const functions = require("firebase-functions");
const stripeConfig = require("./stripeConfig");
const payments = require("./payments");
const bookings = require("./bookings");


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send({ message: 'Hello form Firebase' })
// })

exports.createPaymentIntent = payments.createPaymentIntent;
exports.createBooking = bookings.createBooking;
exports.handleStripeEvent = stripeConfig.handleStripeEvent;
