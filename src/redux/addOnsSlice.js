import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, addOnsCollection } from "../firebase/client";
import { createThunkCondition } from "./utils";

const thunkCondition = createThunkCondition("addOns");

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
  },
  thunkCondition
);

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
  },
  thunkCondition
);

const addOnsSlice = createSlice({
  name: "addOns",
  initialState: {
    addOns: [],
    loading: "idle",
    error: null,
  },
  reducers: {
    resetAddOnsSlice: (state, action) => {
      state.addOns = [];
      state.loading = "idle";
    },
  },
  extraReducers: {
    [createAddOn.pending]: (state, action) => {
      state.loading = "pending";
    },
    [createAddOn.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
    },
    [createAddOn.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload;
    },

    [getAddOnsList.pending]: (state, action) => {
      state.loading = "pending";
    },
    [getAddOnsList.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      state.addOns = action.payload;
    },
    [getAddOnsList.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload;
    },
  },
});

export const {resetAddOnsSlice} = addOnsSlice.actions;

export default addOnsSlice.reducer;
