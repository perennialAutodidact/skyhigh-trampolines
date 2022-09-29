const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

exports.createBooking = functions.https.onCall((data, context) => {
  functions.logger.log("CREATE BOOKING DATA", data);
  db.collection("bookings").doc().set({
    
  })
});
