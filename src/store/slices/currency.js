import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { post } from "../../helpers/api";

const initialState = {
  currency:null,
  loading:false,
  isSuccess:false

}
export const  fetchCurrency = createAsyncThunk(
  'currency/fetchCurrency',
    async () => {
      try {
        const repsonse = await post('feedback')
        return repsonse
      } catch (error) {
        throw error
      }
    }

)
export const currencySlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    getCurrency (state,action) {
        state.currency = action.payload
    }
  },
  extraReducers: {
    [fetchCurrency.pending.type]: (state,action) => {
      state.loading = true
      state.isSuccess = false
    },
    [fetchCurrency.fulfilled.type]: (state,action) => {
      state.loading = false
      state.isSuccess = true
    }
  }
})

export const { getCurrency } = currencySlice.actions

export default currencySlice.reducer