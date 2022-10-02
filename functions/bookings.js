const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp(functions.config().firebase);
}
const db = admin.firestore();

const createBooking = (eventData) => {
  db.collection("bookings")
    .doc()
    .set({
      paymentId: eventData.id,
      ...eventData.metadata,
    });
};

const updateBooking = (eventData) => {};

const deleteBooking = (eventData) => {};

exports.writeBookingFromStripeEvent = functions.firestore
  .document("stripeEvents/{eventId}")
  .onCreate((event, context) => {
    const eventData = event.data();

    switch (eventData.type) {
      case "payment_intent.created":
        createBooking(eventData);
        break;
      case "payment_intent.succeeded":
        // updateBooking(eventData)
        break;
      case "payment_intent.cancelled":
        // deleteBooking(eventData)
        break;
    }

    return { message: "Success" };
  });
