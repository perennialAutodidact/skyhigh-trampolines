const functions = require("firebase-functions");
const Stripe = require("stripe");
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp(functions.config().firebase);
}

const db = admin.firestore();

exports.handleStripeEvent = functions.https
  .runWith({
    secrets: ["STRIPE_SECRET_KEY", "STRIPE_HANDLE_EVENT_SECRET"],
  })
  .onRequest((req, res) => {
    let stripe = Stripe(process.env.STRIPE_SECRET_KEY)
    let stripeSigningSecret = process.env.STRIPE_HANDLE_EVENT_SECRET;
    let signature = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        stripeSigningSecret
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
