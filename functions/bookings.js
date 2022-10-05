const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp(functions.config().firebase);
}
const db = admin.firestore();

const createBooking = (eventData) => {
  try {
    const bookingData = eventData.data.object;
    let { date, customer, rooms, addOns } = bookingData.metadata;
    customer = JSON.parse(customer);
    rooms = JSON.parse(rooms);
    addOns = JSON.parse(addOns);

    // const bookingData = JSON.parse(eventData.data.object.metadata);
    // functions.logger.log(bookingData);
    db.collection("bookings").doc().set({
      date,
      paymentId: eventData.data.object.id,
      confirmation: "pending",
      customer,
      rooms,
      addOns,
    });
  } catch (error) {
    throw new functions.https.HttpsError("unknown", error);
  }
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
