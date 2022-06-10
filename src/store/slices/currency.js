import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from "../../helpers/api";

const initialState = {
  current_currency: null,
  loading: false,
  isSuccess: false,
  currencies: [],
  count_row: [],
  count_col: [],
  currency_amount: 1,
  

}
export const fetchCurrency = createAsyncThunk(
  'currency/fetchCurrency',
  async () => {
    try {
      const response = await get('currencies')
      console.log(response);
      return response.data
    } catch (error) {
      throw error
    }
  }

)
export const currencySlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    getCurrency(state, action) {
      state.current_currency = action.payload
    },
    getCountCol(state) {
      state.count_col.push(state.count_col.length)
    },
    getCountRow(state) {
      state.count_row.push(state.count_row.length)
    },
    getCurrencyAmount(state, action) {
      console.log(action.payload);
      state.currency_amount = action.payload
    }
  },
  extraReducers: {
    [fetchCurrency.pending.type]: (state, action) => {
      state.loading = true
      state.isSuccess = false
    },
    [fetchCurrency.fulfilled.type]: (state, action) => {
      state.loading = false
      state.isSuccess = true
      state.currencies = action.payload.data
    }
  }
})

export const { getCurrency, getCountCol, getCountRow, getCurrencyAmount } = currencySlice.actions

export default currencySlice.reducer