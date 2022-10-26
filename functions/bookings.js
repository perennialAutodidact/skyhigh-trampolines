const functions = require("firebase-functions");
const { getFirestore } = require("firebase-admin/firestore");
const sendgrid = require("@sendgrid/mail");
const secrets = require("./secretsClient");

const db = getFirestore();

/**
 *
 * @param {number} amount A number representing money, probably an integer
 * @returns {number} The number as a two-digit decimal number
 *
 * toMoney(1299) => 12.99
 */
const toMoney = (amount) => amount && (amount.toFixed(0) / 100).toFixed(2);

// function to send email
const buildEmailMessage = (
  templateId,
  booking,
  amount,
  tax,
  subTotal,
  transactionFee
) => {
  const message = {
    to: [booking.customer?.email],
    from: "skyhightrampolines@gmail.com",
    template_id: templateId,

    dynamic_template_data: {
      customer: booking.customer,
      subject: "Booking Confirmation",
      receiptId: booking.receiptId.split("-")[0],
      date: booking.date,
      rooms: booking.rooms.map((room) => ({
        ...room,
        products: room.products.map((product) => ({
          ...product,
          totalPrice: toMoney((product.totalPrice / 100) * 100),
        })),
      })),
      addOns: booking.addOns.map((addOn) => ({
        ...addOn,
        totalPrice: toMoney((addOn.totalPrice / 100) * 100),
      })),
      subTotal: toMoney((subTotal / 100) * 100),
      transactionFee: toMoney((transactionFee / 100) * 100),
      tax: toMoney((tax / 100) * 100),
      grandTotal: toMoney((amount / 100) * 100),
    },
  };
  return message;
};

exports.updateBookingFromStripeEvent = functions
  .firestore.document("stripeEvents/{eventId}")
  .onCreate(async (event, context) => {
    const sendgridApiKey = secrets.getSecretValue('SENDGRID_API_KEY');
    const templateId = process.env.SENDGRID_TEMPLATE_ID;

    sendgrid.setApiKey(sendgridApiKey);
    
    try {
      const eventData = event.data();

      const paymentIntent = eventData.data.object;

      const {
        amount,
        id: paymentIntentId,
        metadata: { bookingId, tax, subTotal, transactionFee, receiptId },
      } = paymentIntent;

      const bookingRef = db.collection("bookings").doc(bookingId);

      switch (eventData.type) {
        case "payment_intent.created":
          await bookingRef.update({
            paymentIntentId,
          });
          break;
        case "payment_intent.succeeded":
          // const receiptId = paymentIntent.charges.data[0].receipt_number // use this for live stripe receiptId

          await db
            .collection("receipts")
            .doc(receiptId)
            .set({
              bookingId,
              grandTotal: parseInt(amount),
              subTotal: parseInt(subTotal),
              tax: parseInt(tax),
              transactionFee,
            });

          await bookingRef.update({
            status: "complete",
            receiptId: receiptId,
          });

          const booking = await bookingRef.get().then((doc) => doc.data());

          // send email
          const message = buildEmailMessage(
            templateId,
            receiptId,
            booking,
            amount,
            tax,
            subTotal,
            transactionFee
          );

          await sendgrid.send(message);
          break;
        case "payment_intent.cancelled":
          // deleteBooking(eventData)
          break;
        default:
          break;
      }

      return { message: "Success" };
    } catch (error) {
      throw new functions.https.HttpsError("unknown", error);
    }
  });
