const functions = require("firebase-functions");
const { defineSecret } = require("firebase-functions/params");
const Stripe = require("stripe");
const {getFirestore} = require("firebase-admin/firestore")

const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");
const STRIPE_HANDLE_EVENT_SECRET = defineSecret("STRIPE_HANDLE_EVENT_SECRET");

const db = getFirestore();

exports.handleStripeEvent = functions
  .runWith({
    secrets: [STRIPE_SECRET_KEY, STRIPE_HANDLE_EVENT_SECRET],
  })
  .https.onRequest((req, res) => {
    let stripe = Stripe(process.env.STRIPE_SECRET_KEY);
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
