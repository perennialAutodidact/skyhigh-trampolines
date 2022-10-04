import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, getDocs } from "firebase/firestore";
import { storage, productsCollection } from "../firebase/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createThunkCondition } from "./utils";

const thunkCondition = createThunkCondition("products");

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    // save data to firebase
    const { photo, ...data } = formData;
    try {
      const productsStorageRef = ref(storage, "products/" + photo.name);
      const snapshot = await uploadBytes(productsStorageRef, photo);

      const photoLink = await getDownloadURL(snapshot.ref);

      return await addDoc(
        productsCollection,
        Object.assign(data, { photo: photoLink })
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  thunkCondition
);

// fetch all products from firebase
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    // fetch data from firebase and store in constant
    const data = await getDocs(productsCollection)
      .then((snapshot) => {
        let products = [];
        snapshot.forEach((doc) => {
          products.push({ ...doc.data(), id: doc.id });
        });
        return products;
      })
      .catch((err) => console.log(err.message));

    return data;
  },
  thunkCondition
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: "idle",
    error: null,
  },
  //reducers: {},
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload;
    },

    // fetch products
    [fetchProducts.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;
