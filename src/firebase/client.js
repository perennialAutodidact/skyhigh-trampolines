import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import "@firebase/auth";
import "@firebase/storage";
import "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const colRef = collection(db, "Product Form");
const productsRef = collection(db, "products");

getDocs(colRef)
  .then((snapshot) => {
    let productForm = [];
    snapshot.forEach((doc) => {
      productForm.push({ ...doc.data(), id: doc.id });
    });
    console.log(productForm);
  })
  .catch((err) => {
    console.log(err.message);
  });

export { db, auth, storage, colRef, productsRef };
