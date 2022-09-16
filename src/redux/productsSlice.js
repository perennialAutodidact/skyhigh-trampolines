import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/client'
import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (formData, { rejectWithValue }) => {
    console.log('onSubmit')
    console.log(formData)
    // save data to firebase
    const { photo, ...data } = formData
    try {
      const storage = getStorage()
      const storageRef = ref(storage, photo.name)
      const snapshot = await uploadBytes(storageRef, photo)
      console.log(snapshot)

      const photoLink = await getDownloadURL(snapshot.ref)
      console.log(photoLink)

      return await addDoc(
        collection(db, 'Product Form'),
        Object.assign(data, { photo: photo.name }),
      ).then((result) => result.someValueFromTheResult)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: 'idle',
  },
  //reducers: {},
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      state.loading = 'pending'
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = 'fulfilled'
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = 'rejected'
    },
  },
})

export default productSlice.reducer
