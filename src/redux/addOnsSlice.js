import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, addOnsCollection } from "../firebase/client";

export const createAddOn = createAsyncThunk(
  "addOns/create",
  async (formData, { rejectWithValue }) => {
    // save data to firebase
    const { photo, ...data } = formData;
    try {
      const addOnsStorageRef = ref(storage, "addOns/" + photo.name);
      const snapshot = await uploadBytes(addOnsStorageRef, photo);

      const photoLink = await getDownloadURL(snapshot.ref);

      return await addDoc(addOnsCollection, { ...data, photo: photoLink });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const addOnsSlice = createSlice({
  name: "addOns",
  initialState: {
    addOns: [],
    loading: "idle",
  },
  //reducers: {},
  extraReducers: {
    [createAddOn.pending]: (state, action) => {
      state.loading = "pending";
    },
    [createAddOn.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
    },
    [createAddOn.rejected]: (state, action) => {
      state.loading = "rejected";
    },
  },
});

export default addOnsSlice.reducer;
