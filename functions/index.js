// import * as sgMail from "@sendgrid/mail";
const sgMail = require("@sendgrid/mail");

const functions = require("firebase-functions");
const cors = require("cors");
const admin = require("firebase-admin");
const { app } = require("firebase-admin");
admin.initializeApp();
const SENDGRID_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_KEY);

// firebase function to send email
exports.sendEmail = functions.https.onCall(async (data, context) => {
  // send a post request to the sendgrid api
  const msg = {
    to: data.to,
    from: "wilado9200@edxplus.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    throw new functions.https.HttpsError("unknown", error);
  }
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  cors()(request, response, () => {
    response.send({ message: "Hello form Firebase" });
  });
});
