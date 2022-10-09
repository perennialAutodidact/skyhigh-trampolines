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
  async (_, { rejectWithValue }) => {
    try {
      const products = await getDocs(productsCollection).then((productDocs) => {
        let productsData = [];
        productDocs.forEach((doc) => {
          productsData.push({ ...doc.data(), id: doc.id });
        });
        return productsData;
      });

      return products;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  thunkCondition
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: "idle",
    error: null,
  },
  reducers: {
    resetProductsSlice: (state, action) => {
      state.products = [];
      state.loading = "idle";
    },
  },
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      state.loading = "pending";
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
    },
    [fetchProducts.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = "fulfilled";
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      console.log(action.payload);
      state.loading = "rejected";
      state.error = action.payload;
    },
  },
});

export const { resetProductsSlice } = productsSlice.actions;
export default productsSlice.reducer;
