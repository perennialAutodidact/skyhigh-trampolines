const functions = require("firebase-functions");
const payments = require("./payments");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send({ message: 'Hello form Firebase' })
// })

exports.createPaymentIntent = payments.createPaymentIntent;
