const functions = require("firebase-functions");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  const { amount, metadata } = data;
  try {
    return await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata,
    });
  } catch (error) {
    functions.logger.log("Stripe Payment Intent Error:", error);
    // console.log(error);
    throw new functions.https.HttpsError("unknown", error);
  }
});
