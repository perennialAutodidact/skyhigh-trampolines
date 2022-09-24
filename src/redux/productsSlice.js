import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, storage, productsCollection } from "../firebase/client";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
  }
);

// fetch all products from firebase
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    // fetch data from firebase and store in constant
    const data = await getDocs(productsCollection)
      .then((snapshot) => {
        let productForm = [];
        snapshot.forEach((doc) => {
          productForm.push({ ...doc.data(), id: doc.id });
        });
        return productForm;
      })
      .catch((err) => console.log(err.message));

    return data;
  }
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
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = "rejected";
    },

    // fetch products
    [fetchProducts.pending]: (state) => {
      state.loading = "pending";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state) => {
      state.loading = "rejected";
    },
  },
});

export default productSlice.reducer;
