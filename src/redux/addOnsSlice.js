import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { addDoc, collection } from 'firebase/firestore'
import { db, storage } from '../firebase/client'
import { getStorage, ref } from 'firebase/storage'

export const createAddOns = createAsyncThunk(
  'addOns/create',
  async (formData, { rejectWithValue }) => {
    console.log('onSubmit')
    console.log(formData)
    // save data to firebase
    const colRef = collection(db, 'add on')

    // try {
    //   return await addDoc(colRef, formData).then(
    //     (result) => result.someValueFromTheResult,
    //   )
    // } catch (error) {
    //   return rejectWithValue(error)
    // }
    return addDoc(colRef, formData)
      .then((snapshot) => {
        console.log('snap', snapshot)
        let addOnForm = []
        snapshot.forEach((doc) => {
          addOnForm.push({ ...doc.data(), id: doc.id })
        })
        console.log(addOnForm)
      })
      .catch((err) => {
        console.log('err', err)
      })
  },
)

const addOnsSlice = createSlice({
  name: 'addOns',
  initialState: {
    products: [],
    loading: 'idle',
  },
  //reducers: {},
  extraReducers: {
    [createAddOns.pending]: (state, action) => {
      state.loading = 'pending'
    },
    [createAddOns.fulfilled]: (state, action) => {
      state.loading = 'fulfilled'
    },
    [createAddOns.rejected]: (state, action) => {
      state.loading = 'rejected'
    },
  },
})

export default addOnsSlice.reducer
