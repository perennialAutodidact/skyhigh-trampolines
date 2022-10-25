const functions = require("firebase-functions");
const { defineSecret } = require("firebase-functions/params");
const Stripe = require("stripe");
const {getFirestore} = require("firebase-admin/firestore")

const db = getFirestore();

const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");

exports.createPaymentIntent = functions
  .runWith({ secrets: [STRIPE_SECRET_KEY] }).https
  .onCall(async (data, context) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
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

exports.updatePaymentIntent = functions
  .runWith({ secrets: [STRIPE_SECRET_KEY] }).https
  .onCall(async (paymentIntentData, context) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const { id, data } = paymentIntentData;
    try {
      return await stripe.paymentIntents.update(id, { ...data });
    } catch (error) {
      throw new functions.https.HttpsError("unknown", error);
    }
  });

exports.cancelPaymentIntent = functions.runWith({
  secrets: [STRIPE_SECRET_KEY],
}).https.onCall(async (paymentIntentId, context) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

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
});
