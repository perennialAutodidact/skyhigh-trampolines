const functions = require("firebase-functions");
const Stripe = require("stripe");
const { getFirestore } = require("firebase-admin/firestore");
const secrets = require("./secretsClient");
const db = getFirestore();

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  const stripeSecretKey =
    process.env.NODE_ENV === "production"
      ? await secrets.getSecretValue("STRIPE_SECRET_KEY")
      : process.env.STRIPE_SECRET_KEY;
  const stripe = Stripe(stripeSecretKey);
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
    const stripeSecretKey =
      process.env.NODE_ENV === "production"
        ? await secrets.getSecretValue("STRIPE_SECRET_KEY")
        : process.env.STRIPE_SECRET_KEY;
    const stripe = Stripe(stripeSecretKey);

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
    const stripeSecretKey =
      process.env.NODE_ENV === "production"
        ? await secrets.getSecretValue("STRIPE_SECRET_KEY")
        : process.env.STRIPE_SECRET_KEY;
    const stripe = Stripe(stripeSecretKey);

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
