import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

import "@firebase/auth";
import "@firebase/storage";
import { connectFirestoreEmulator } from "firebase/firestore";

const firebaseKey = process.env.REACT_APP_FIREBASE_API_KEY;
const firebaseProjectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const firebaseAuthDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const firebaseStorageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;

const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
};
console.log(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const functions = getFunctions(app);

// connect emulators in developement
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectStorageEmulator(storage, "localhost", 9199);
}

const productsCollection = collection(db, "products");
const roomsCollection = collection(db, "rooms");
const addOnsCollection = collection(db, "addOns");
const bookingsCollection = collection(db, "bookings");
const receiptsCollection = collection(db, "reciepts");
const waiversCollection = collection(db, "waivers");

export {
  db,
  auth,
  storage,
  functions,
  productsCollection,
  roomsCollection,
  addOnsCollection,
  bookingsCollection,
  receiptsCollection,
  waiversCollection,
};
