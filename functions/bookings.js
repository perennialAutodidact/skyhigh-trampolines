const functions = require("firebase-functions");
const admin = require("firebase-admin");
const uuid = require("uuid");
if (admin.apps.length === 0) {
  admin.initializeApp(functions.config().firebase);
}
const db = admin.firestore();

//sendgrid
const sgMail = require("@sendgrid/mail");
const SENDGRID_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(SENDGRID_KEY);

// function to send email
const sendEmailToUser = async (
  paymentIntentId,
  data,
  amount,
  tax,
  subTotal,
  transactionFee
) => {
  console.log(data);
  functions.logger.log(data);

  // send a post request to the sendgrid api
  const msg = {
    to: [data.customer?.email, "skaiwilliams85@gmail.com"],
    from: "wilado9200@edxplus.com",
    template_id: TEMPLATE_ID,

    dynamic_template_data: {
      name: data.customer?.fullName,
      subject: "Sky High Booking Confirmation",
      idNumber: paymentIntentId,
      currentDate: new Date().toDateString(),
      dataDate: data.date,
      rooms: data.rooms ? data.rooms : [],
      addOns: data.addOns ? data.addOns : [],
      subtotal: subTotal,
      fee: transactionFee,
      tax: tax,
      total: amount,
    },
  };

  try {
    await sgMail.send(msg);
    console.log("email sent");
    functions.logger.log("email sent");
    return { success: true };
  } catch (error) {
    console.log(error);
    functions.logger.log(error);
    return { success: false, error };
  }
};

exports.createBooking = functions.https.onCall(async (bookingData, context) => {
  try {
    const dateCreated = admin.firestore.Timestamp.now();
    const status = "pending";
    const receiptId = "";

    const res = await db.collection("bookings").add({
      ...bookingData,
      dateCreated,
      status,
      receiptId,
    });
    return { bookingId: res.id };
  } catch (error) {
    throw new functions.https.HttpsError("unknown", error);
  }
});

exports.updateBooking = functions.https.onCall(async (data, context) => {
  const { bookingId, waiverSignature, ...bookingData } = data;

  try {
    if (waiverSignature) {
      const waiver = await db.collection("waivers").add({
        signature: waiverSignature,
        bookingId,
      });
      bookingData["waiverId"] = waiver.id;
    }
    const res = await db
      .collection("bookings")
      .doc(bookingId)
      .update({ ...bookingData });

    return { message: "updated" };
  } catch (error) {
    throw new functions.https.HttpsError("unknown", error);
  }
});

exports.cancelBooking = functions.https.onCall(async (data, context) => {
  const { bookingId } = data;

  try {
    await db.collection("bookings").doc(bookingId).update({
      status: "canceled",
    });

    return { message: "success" };
  } catch (error) {
    throw new functions.https.HttpsError("unknown", error);
  }
});

exports.updateBookingFromStripeEvent = functions.firestore
  .document("stripeEvents/{eventId}")
  .onCreate(async (event, context) => {
    try {
      const eventData = event.data();

      const paymentIntent = eventData.data.object;

      const {
        amount,
        id: paymentIntentId,
        metadata: { bookingId, tax, subTotal, transactionFee },
      } = paymentIntent;

      const booking = db.collection("bookings").doc(bookingId);

      switch (eventData.type) {
        case "payment_intent.created":
          await booking.update({
            paymentIntentId,
          });
          break;
        case "payment_intent.succeeded":
          // const receiptId = paymentIntent.charges.data[0].receipt_number // use this for live stripe receiptId
          const receiptId = uuid
            .v4(Date.now(), Buffer.alloc(4))
            .toString("hex")
            .toUpperCase();

          await db
            .collection("receipts")
            .doc(receiptId)
            .set({
              bookingId,
              grandTotal: amount,
              subTotal: parseInt(subTotal),
              tax: parseInt(tax),
              transactionFee,
            });

          await booking.update({
            status: "complete",
            receiptId: receiptId,
          });

          //
          // SEND RECEIPT EMAIL
          //
          const data = await booking.get().then((doc) => doc.data());
          //log data
          console.log(data);
          functions.logger.log(data);

          // send email
          await sendEmailToUser(
            paymentIntentId,
            data,
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
