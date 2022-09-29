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

export const getAddOnsList = createAsyncThunk(
  "addOns/getAddOnsList",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const addOns = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      ).then((res) => TEMP_ADD_ONS);

      return fulfillWithValue(addOns);
    } catch (error) {
      rejectWithValue("error");
    }
  },
  {
    condition: (_, { getState, extra }) => {
      const { addOns } = getState();
      const fetchStatus = addOns.loading;
      if (fetchStatus === "fulfilled" || fetchStatus === "pending") {
        // Already fetched or in progress, don't need to re-fetch
        return false;
      }
    },
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

    [getAddOnsList.pending]: (state, action) => {
      state.loading = "pending";
    },
    [getAddOnsList.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      state.addOns = action.payload;
    },
    [getAddOnsList.rejected]: (state, action) => {
      state.loading = "rejected";
    },
  },
});

const TEMP_ADD_ONS = [
  {
    id: "O7Z6xM6qcUUhY2rRtitG",
    name: "Jump socks - small (5-9)",
    photo:
      "https://firebasestorage.googleapis.com/v0/b/team-sapphire.appspot.com/o/addOns%2Fjump-socks.png?alt=media&token=7a6ef697-ce63-4885-afab-a3134e9d156b",
    price: "399",
  },

  {
    id: "CJaBISha4mFIUrloVFby",
    name: "Jump socks - medium (10-14)",
    photo:
      "https://firebasestorage.googleapis.com/v0/b/team-sapphire.appspot.com/o/addOns%2Fjump-socks.png?alt=media&token=0f02dbdd-0b6a-4bdd-b5c2-f8bf7c1bd26f",
    price: "399",
  },

  {
    id: "z3L1mFxD2UZLdXwGtv3j",
    name: "Jump socks - large (15+)",
    photo:
      "https://firebasestorage.googleapis.com/v0/b/team-sapphire.appspot.com/o/addOns%2Fjump-socks.png?alt=media&token=fe2102cf-cafc-4664-a6a0-f886f0a7f4e2",
    price: "399",
  },
];

export default addOnsSlice.reducer;
