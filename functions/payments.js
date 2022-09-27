const functions = require("firebase-functions");

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = functions.https.onCall((data, context) => {
    // const {amount, metadata} = data

    return "test"

    // try {
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount,
    //     currency: 'usd',
    //     automatic_payment_methods: { enabled: true },
    //     metadata,
    //   });

    //   return { paymentIntent };
    // } catch (error) {
    //   functions.logger.log("Stripe Payment Intent Error:", error);

    //   return {error}
    // }

});
