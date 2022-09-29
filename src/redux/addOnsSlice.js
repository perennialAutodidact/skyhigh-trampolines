import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { addDoc, collection, getDocs } from "firebase/firestore";
import { addOnsCollection, db, storage } from "../firebase/client";
import { getStorage, ref } from "firebase/storage";

export const createAddOns = createAsyncThunk(
  "addOns/create",
  async (formData, { rejectWithValue }) => {
    console.log("onSubmit");
    console.log(formData);
    // save data to firebase
    const colRef = collection(db, "add on");

    // try {
    //   return await addDoc(colRef, formData).then(
    //     (result) => result.someValueFromTheResult,
    //   )
    // } catch (error) {
    //   return rejectWithValue(error)
    // }
    return addDoc(colRef, formData)
      .then((snapshot) => {
        console.log("snap", snapshot);
        let addOnForm = [];
        snapshot.forEach((doc) => {
          addOnForm.push({ ...doc.data(), id: doc.id });
        });
        console.log(addOnForm);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
);

// fetch all add ons from firebase
export const getAddOnsList = createAsyncThunk(
  "addOns/getAddOnsList",
  async () => {
    // fetch data from firebase and store in constant
    const data = await getDocs(addOnsCollection)
      .then((snapshot) => {
        const addOns = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return addOns;
      })
      .catch((err) => console.log(err.message));

    return data;
  }
);

const addOnsSlice = createSlice({
  name: "addOns",
  initialState: {
    products: [],
    loading: "idle",
  },
  //reducers: {},
  extraReducers: {
    [createAddOns.pending]: (state, action) => {
      state.loading = "pending";
    },
    [createAddOns.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
    },
    [createAddOns.rejected]: (state, action) => {
      state.loading = "rejected";
    },

    //fetch add ons
    [getAddOnsList.pending]: (state) => {
      state.loading = "pending";
    },
    [getAddOnsList.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      state.products = action.payload;
    },
    [getAddOnsList.rejected]: (state) => {
      state.loading = "rejected";
    },
  },
});

export default addOnsSlice.reducer;
