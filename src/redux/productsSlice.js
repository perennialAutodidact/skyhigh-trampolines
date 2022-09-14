import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: 'idle'
  },
  reducers: {},
  extraReducers: {}
})

export default productSlice.reducer