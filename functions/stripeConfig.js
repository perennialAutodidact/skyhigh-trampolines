const functions = require("firebase-functions");
const Stripe = require("stripe");
const { getFirestore } = require("firebase-admin/firestore");
const secrets = require("./secretsClient");

const db = getFirestore();

exports.handleStripeEvent = functions.https.onRequest(async (req, res) => {
  const stripeSecretKey = await secrets.getSecretValue("STRIPE_SECRET_KEY");
  const stripeSigningSecret = await secrets.getSecretValue(
    "STRIPE_HANDLE_EVENT_SECRET"
  );

  let stripe = Stripe(stripeSecretKey);
  let signature = req.get("stripe-signature");
  let event;
  try {
    functions.logger.log({signature, stripeSigningSecret})
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      stripeSigningSecret
    );
    functions.logger.log({ event });
    await db
      .collection("stripeEvents")
      .doc()
      .set({ ...event });

    return res.send();
  } catch (error) {
    throw new functions.https.HttpsError(
      "unknown",
      `Error constructing Stripe event: ${error}`
    );
  }
});
