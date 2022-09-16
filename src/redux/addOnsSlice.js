import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { addDoc, collection } from 'firebase/firestore'
import { db, storage } from '../firebase/client'
import { getStorage, ref } from 'firebase/storage'

export const createAddOnsSlice = createAsyncThunk(
  'products/createProduct',
  async (formData, { rejectWithValue }) => {
    console.log('onSubmit')
    console.log(formData)
    // save data to firebase
    const colRef = collection(db, 'add on')

    addDoc(colRef)
      .then((snapshot) => {
        let addOnForm = []
        snapshot.forEach((doc) => {
          addOnForm.push({ ...doc.data(), id: doc.id })
        })
        console.log(addOnForm)
      })
      .catch((err) => {
        return rejectWithValue(err)
      })
  },
)

const addOnsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: 'idle',
  },
  //reducers: {},
  extraReducers: {
    [createAddOnsSlice.pending]: (state, action) => {
      state.loading = 'pending'
    },
    [createAddOnsSlice.fulfilled]: (state, action) => {
      state.loading = 'fulfilled'
    },
    [createAddOnsSlice.rejected]: (state, action) => {
      state.loading = 'rejected'
    },
  },
})

export default addOnsSlice.reducer
