const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp(functions.config().firebase);
}
const db = admin.firestore();

exports.addProductToRoom = functions.firestore
  .document("/products/{productId}")
  .onCreate(async (product, context) => {
    try {
      const productId = context.params.productId;
      const productData = product.data();

      functions.logger.log(productData);
      functions.logger.log(productId);

      const roomRef = db.collection("rooms").doc(productData.room.id);

      const { name, description, price, duration } = productData;

      await roomRef.collection("products").doc(productId).set({
        name,
        description,
        price,
        duration,
      });

      return { message: "success" };
    } catch (error) {
      throw new functions.https.HttpsError("unknown", error);
    }
  });
