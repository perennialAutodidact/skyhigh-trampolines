import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, getDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, addOnsCollection } from "../firebase/client";
import { createThunkCondition, parseError } from "./utils";

const thunkCondition = createThunkCondition("addOns");

// fetch all add ons from firebase
export const getAddOnsList = createAsyncThunk(
  "addOns/getAddOnsList",
  async (_, { rejectWithValue }) => {
    try {
      // fetch data from firebase and store in constant
      return await getDocs(addOnsCollection).then((snapshot) => {
        const addOns = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return addOns;
      });
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
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

      const newAddOnRef = await addDoc(addOnsCollection, {
        ...data,
        photo: photoLink,
      });
      const newAddOn = await getDoc(newAddOnRef);
      return { newAddOn: { id: newAddOn.id, ...newAddOn.data() } };
    } catch (error) {
      return rejectWithValue(parseError(error));
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
    resetAddOnsLoadingStatus: (state, action) => {
      state.addOns = [];
      state.loading = "idle";
    },
  },
  extraReducers: {
    [createAddOn.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [createAddOn.fulfilled]: (state, action) => {
      state.loading = "succeeded";
      state.addOns = state.addOns.concat(action.payload.newAddOn);
    },
    [createAddOn.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.message;
    },

    [getAddOnsList.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [getAddOnsList.fulfilled]: (state, action) => {
      state.loading = "succeeded";
      state.addOns = action.payload;
    },
    [getAddOnsList.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.message;
    },
  },
});

export const { resetAddOnsLoadingStatus } = addOnsSlice.actions;

export default addOnsSlice.reducer;
