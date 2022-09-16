import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const addOnsSlice = createSlice({
  name: 'addOns',
  initialState: {
    addOns: [],
    loading: 'idle'
  },
  reducers: {},
  extraReducers: {}
})

export default addOnsSlice.reducer