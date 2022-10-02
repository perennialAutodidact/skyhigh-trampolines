const functions = require("firebase-functions");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp(functions.config().firebase);
}

const db = admin.firestore();

exports.handleStripeEvent = functions.https.onRequest((req, res) => {
  let signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_HANDLE_EVENT_SECRET
    );
  } catch (error) {
    throw new functions.https.HttpsError(
      "unknown",
      `Error constructing Stripe event: ${error}`
    );
  }

  db.collection("stripeEvents")
    .doc()
    .set({ ...event });

  return res.send();
});
