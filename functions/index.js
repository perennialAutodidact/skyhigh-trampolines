const functions = require('firebase-functions')
const cors = require('cors')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  cors()(request, response, () => {
    response.send({ message: 'Hello form Firebase' })
  })
})
