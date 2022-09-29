const functions = require("firebase-functions");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");

const callCreateBooking = async (data) => {

  try {
    return await axios.post(
      "https://us-central1-team-sapphire.cloudfunctions.net/createBooking",
      {data}
    );
  } catch (error) {
    throw new functions.https.HttpsError("unknown", JSON.stringify(error.response.data));
  }
};

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

  let paymentIntent;
  // Handle the event
  switch (event.type) {
    case "payment_intent.canceled":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.canceled
      break;
    case "payment_intent.created":
      paymentIntent = event.data.object;
      functions.logger.log('PAYMENT INTENT', paymentIntent)
      // Then define and call a function to handle the event payment_intent.created
      callCreateBooking(paymentIntent);

      break;
    case "payment_intent.partially_funded":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.partially_funded
      break;
    case "payment_intent.payment_failed":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.payment_failed
      break;
    case "payment_intent.processing":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.processing
      break;
    case "payment_intent.requires_action":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.requires_action
      break;
    case "payment_intent.succeeded":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return res.send({ message: "handleStripeEvent Called" });
});
