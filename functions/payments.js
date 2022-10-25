const functions = require("firebase-functions");
const Stripe = require("stripe");
const admin = require("firebase-admin");

const db = admin.firestore();

exports.createPaymentIntent = functions.https
  .runWith({ secrets: ["STRIPE_API_KEY"] })
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

exports.updatePaymentIntent = functions.https
  .runWith({ secrets: ["STRIPE_API_KEY"] })
  .onCall(async (paymentIntentData, context) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const { id, data } = paymentIntentData;
    try {
      return await stripe.paymentIntents.update(id, { ...data });
    } catch (error) {
      throw new functions.https.HttpsError("unknown", error);
    }
  });

exports.cancelPaymentIntent = functions.https.runWith({
  secrets: ["STRIPE_API_KEY"],
});
onCall(async (paymentIntentId, context) => {
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
