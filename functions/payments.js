const functions = require("firebase-functions");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
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

exports.cancelPaymentIntent = functions.https.onCall(
  async (paymentIntentId, context) => {
    try {
      return await stripe.paymentIntents.cancel(paymentIntentId);
    } catch (error) {
      throw new functions.https.HttpsError("unknown", error);
    }
  }
);
