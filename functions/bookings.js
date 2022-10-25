const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp(functions.config().firebase);
}
const db = admin.firestore();

//sendgrid
const sgMail = require("@sendgrid/mail");
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const TEMPLATE_ID = process.env.SENDGRID_TEMPLATE_ID;
sgMail.setApiKey(SENDGRID_API_KEY);

/**
 *
 * @param {number} amount A number representing money, probably an integer
 * @returns {number} The number as a two-digit decimal number
 *
 * toMoney(1299) => 12.99
 */
const toMoney = (amount) => amount && (amount.toFixed(0) / 100).toFixed(2);

// function to send email
const sendEmailToUser = async (
  receiptId,
  booking,
  amount,
  tax,
  subTotal,
  transactionFee
) => {
  // send a post request to the sendgrid api
  const msg = {
    to: [booking.customer?.email],
    from: "skyhightrampolines@gmail.com",
    template_id: TEMPLATE_ID,

    dynamic_template_data: {
      customer: booking.customer,
      subject: "Booking Confirmation",
      receiptId: booking.receiptId.split("-")[0],
      date: booking.date,
      rooms: booking.rooms.map((room) => ({
        ...room,
        products: room.products.map((product) => ({
          ...product,
          totalPrice: toMoney((product.totalPrice / 100) * 100),
        })),
      })),
      addOns: booking.addOns.map((addOn) => ({
        ...addOn,
        totalPrice: toMoney((addOn.totalPrice / 100) * 100),
      })),
      subTotal: toMoney((subTotal / 100) * 100),
      transactionFee: toMoney((transactionFee / 100) * 100),
      tax: toMoney((tax / 100) * 100),
      grandTotal: toMoney((amount / 100) * 100),
    },
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

// exports.createBooking = functions.https.onCall(async (bookingData, context) => {
//   try {
//     const dateCreated = admin.firestore.Timestamp.now();
//     const status = "pending";
//     const receiptId = "";

//     const res = await db.collection("bookings").add({
//       ...bookingData,
//       dateCreated,
//       status,
//       receiptId,
//     });
//     return { bookingId: res.id };
//   } catch (error) {
//     throw new functions.https.HttpsError("unknown", error);
//   }
// });

// exports.updateBooking = functions.https.onCall(async (data, context) => {
//   const { bookingId, waiverSignature, ...bookingData } = data;

//   try {
//     if (waiverSignature) {
//       const waiver = await db.collection("waivers").add({
//         signature: waiverSignature,
//         bookingId,
//       });
//       bookingData["waiverId"] = waiver.id;
//     }
//     const res = await db
//       .collection("bookings")
//       .doc(bookingId)
//       .update({ ...bookingData });

//     return { message: "updated" };
//   } catch (error) {
//     throw new functions.https.HttpsError("unknown", error);
//   }
// });

// exports.cancelBooking = functions.https.onCall(async (data, context) => {
//   const { bookingId } = data;

//   try {
//     await db.collection("bookings").doc(bookingId).update({
//       status: "canceled",
//     });

//     return { message: "success" };
//   } catch (error) {
//     throw new functions.https.HttpsError("unknown", error);
//   }
// });

exports.updateBookingFromStripeEvent = functions.firestore
  .document("stripeEvents/{eventId}")
  .onCreate(async (event, context) => {
    try {
      const eventData = event.data();

      const paymentIntent = eventData.data.object;

      const {
        amount,
        id: paymentIntentId,
        metadata: { bookingId, tax, subTotal, transactionFee, receiptId },
      } = paymentIntent;

      const bookingRef = db.collection("bookings").doc(bookingId);

      switch (eventData.type) {
        case "payment_intent.created":
          await bookingRef.update({
            paymentIntentId,
          });
          break;
        case "payment_intent.succeeded":
          // const receiptId = paymentIntent.charges.data[0].receipt_number // use this for live stripe receiptId

          await db
            .collection("receipts")
            .doc(receiptId)
            .set({
              bookingId,
              grandTotal: parseInt(amount),
              subTotal: parseInt(subTotal),
              tax: parseInt(tax),
              transactionFee,
            });

          await bookingRef.update({
            status: "complete",
            receiptId: receiptId,
          });

          const booking = await bookingRef.get().then((doc) => doc.data());

          // send email
          await sendEmailToUser(
            receiptId,
            booking,
            amount,
            tax,
            subTotal,
            transactionFee
          );

          break;
        case "payment_intent.cancelled":
          // deleteBooking(eventData)
          break;
        default:
          break;
      }

      return { message: "Success" };
    } catch (error) {
      throw new functions.https.HttpsError("unknown", error);
    }
  });
