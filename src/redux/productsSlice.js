import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, getDocs, getDoc } from "firebase/firestore";
import { storage, productsCollection } from "../firebase/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createThunkCondition, parseError } from "./utils";

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

      const newProductRef = await addDoc(productsCollection, {
        ...data,
        photo: photoLink,
      });
      const newProduct = await getDoc(newProductRef);

      return { newProduct: { id: newProduct.id, ...newProduct.data() } };
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
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
      return rejectWithValue(parseError(error));
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
    resetProductsLoadingStatus: (state, action) => {
      state.loading = "idle";
    },
  },
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = "succeeded";
      state.products = state.products.concat(action.payload.newProduct);
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.message;
    },

    // fetch products
    [fetchProducts.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = "succeeded";
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.message;
    },
  },
});

export const { resetProductsLoadingStatus } = productsSlice.actions;
export default productsSlice.reducer;
