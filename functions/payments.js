const functions = require("firebase-functions");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const admin = require("firebase-admin");

const db = admin.firestore();

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  functions.logger.log("env", process.env);
  const { amount, metadata } = data;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata,
    });

    const { client_secret: clientSecret, id } = paymentIntent;

    return { clientSecret, id };
  } catch (error) {
    throw new functions.https.HttpsError("unknown", error);
  }
});

exports.updatePaymentIntent = functions.https.onCall(
  async (paymentIntentData, context) => {
    const { id, data } = paymentIntentData;
    try {
      return await stripe.paymentIntents.update(id, { ...data });
    } catch (error) {
      throw new functions.https.HttpsError("unknown", error);
    }
  }
);

exports.cancelPaymentIntent = functions.https.onCall(
  async (paymentIntentId, context) => {
    try {
      const booking = await db
        .collection("bookings")
        .where("paymentIntentId", "==", paymentIntentId)
        .get();

      await booking.update({
        status: "canceled",
        receiptId: "",
      });

      return await stripe.paymentIntents.cancel(paymentIntentId);
    } catch (error) {
      throw new functions.https.HttpsError("unknown", error);
    }
  }
);
