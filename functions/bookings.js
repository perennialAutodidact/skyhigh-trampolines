const functions = require('firebase-functions')

exports.createBooking = functions.https.onCall((data,context)=>{
  functions.logger.log("CREATE BOOKING DATA", data)
})