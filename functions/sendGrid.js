// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const sgMail = require("@sendgrid/mail");
// const SENDGRID_KEY = process.env.SENDGRID_KEY;
// const TEMPLATE_ID = process.env.SENDGRID_TEMPLATE_ID;
// sgMail.setApiKey(SENDGRID_KEY);

// if (admin.apps.length === 0) {
//   admin.initializeApp(functions.config().firebase);
// }
// // firebase function to send email
// exports.sendEmail = functions.https.onCall(async (data, context) => {
//   // send a post request to the sendgrid api
//   const msg = {
//     to: data.to,
//     from: "wilado9200@edxplus.com",
//     template_id: TEMPLATE_ID,

//     dynamic_template_data: {
//       name: data.name,
//       subject: data.subject,
//       idNumber: data.idNumber,
//       currentDate: data.currentDate,
//       orderHistory: data.orderHistory,
//       bookingDate: data.bookingDate,
//       subtotal: data.subtotal,
//       fee: data.fee,
//       tax: data.tax,
//       total: data.total,
//     },

//     // subject: "Sending with SendGrid is Fun",
//     // text: "and easy to do anywhere, even with Node.js",
//     // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//   };
//   try {
//     await sgMail.send(msg);
//     return { success: true };
//   } catch (error) {
//     throw new functions.https.HttpsError("unknown", error);
//   }
// });

// // send email when new booking is created in firestore
// exports.sendEmailToCustomer = functions.firestore
//   .document("bookings/{bookingId}")
//   .onCreate(async (snap, context) => {
//     //retrieve data from firestore
//     const booking = snap.data();

//     //log data
//     functions.logger.log("booking", booking);

//     // send a post request to the sendgrid api
//     const msg = {
//       to: booking.email,
//       from: "wilado9200@edxplus.com",
//       template_id: TEMPLATE_ID,

//       dynamic_template_data: {
//         name: booking.fullName,
//         subject: "Booking Confirmation",
//         idNumber: booking.paymentIntentId,
//         currentDate: new Date().toDateString(),
//         bookingDate: booking.date,
//         rooms: booking.rooms ? booking.rooms : [],
//         addOns: booking.addOns ? booking.addOns : [],
//         subtotal: booking.subTotal,
//         fee: booking.transactionFee,
//         tax: booking.tax,
//         total: booking.amount,
//       },
//     };
//     try {
//       await sgMail.send(msg);
//       return { success: true };
//     } catch (error) {
//       throw new functions.https.HttpsError("unknown", error);
//     }
//   });
