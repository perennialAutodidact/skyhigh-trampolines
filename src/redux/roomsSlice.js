import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import {
  storage,
  roomsCollection,
  productsCollection,
} from "../firebase/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createThunkCondition, parseError } from "./utils";

const thunkCondition = createThunkCondition("rooms");

export const createRoom = createAsyncThunk(
  "rooms/create",
  async (formData, { rejectWithValue }) => {
    try {
      const roomsRef = ref(storage, "rooms/" + formData.photo.name);

      const { name, capacity, photo } = formData;

      const snapshot = await uploadBytes(roomsRef, photo);
      const photoLink = await getDownloadURL(snapshot.ref);

      const newRoomDoc = await addDoc(roomsCollection, {
        name,
        capacity,
        photo: photoLink,
      });
      const newRoom = await getDoc(newRoomDoc);
      return { newRoom: { id: newRoom.id, ...newRoom.data() } };
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
  thunkCondition
);

const getRoomProducts = async (roomId) => {
  const productsQuery = query(
    productsCollection,
    where("room.id", "==", roomId)
  );

  const products = await getDocs(productsQuery).then((productDocs) => {
    let productData = [];

    productDocs.forEach((productDoc) => {
      productData.push({ ...productDoc.data(), id: productDoc.id });
    });

    return productData;
  });

  return products;
};

export const getRoomsList = createAsyncThunk(
  "rooms/getRoomList",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      let rooms = await getDocs(roomsCollection).then((roomDocs) => {
        let roomData = [];
        roomDocs.forEach(async (roomDoc) => {
          roomData.push({ ...roomDoc.data(), id: roomDoc.id });
        });
        return roomData;
      });

      rooms = await Promise.all(
        rooms.map(async (room) => {
          let products = await getRoomProducts(room.id);

          return { ...room, products };
        })
      );

      return fulfillWithValue(rooms);
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
  thunkCondition
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    loading: "idle",
    error: null,
  },
  reducers: {
    resetRoomsLoadingStatus: (state, action) => {
      state.loading = "idle";
    },
  },
  extraReducers: {
    [createRoom.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [createRoom.fulfilled]: (state, action) => {
      state.loading = "succeeded";
      state.rooms = state.rooms.concat(action.payload.newRoom);
    },
    [createRoom.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.message;
    },

    [getRoomsList.pending]: (state, action) => {
      state.loading = "pending";
      state.error = null;
    },
    [getRoomsList.fulfilled]: (state, action) => {
      state.rooms = action.payload;
      state.loading = "succeeded";
    },
    [getRoomsList.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload.message;
    },
  },
});

export const { resetRoomsLoadingStatus } = roomsSlice.actions;

export default roomsSlice.reducer;
