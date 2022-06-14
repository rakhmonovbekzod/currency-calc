import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from "../../helpers/api";

const initialState = {
  current_from_currency: "USD",
  loading: false,
  isSuccess: false,
  currencies: [],
  count_row: {},
  count_col: [],
  currency_amount: 10,
  

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
    getFromCurrency(state, action) {
      state.current_to_currency = action.payload
    },
    getCountCol(state) {
      state.count_col.push({length:state.count_col.length,currency_amount:10})
    },
    getCountRow(state,action) {
      if (state.count_row[action.payload.id]) {
        state.count_row[action.payload.id].push(action.payload)
      }else  {
        state.count_row = {...state.count_row,...action.payload }
      }
    },
    getCurrencyAmount(state, action) {
     state.count_col[action.payload.id - 1].currency_amount = action.payload.currency_amount
    },
    deleteCountRow (state,action) {
       let findedIndex = state.count_row[action.payload.id].findIndex(item => item.uniqe_id == action.payload.dataset)
       
      console.log(action.payload,findedIndex);
       state.count_row[action.payload.id].splice(findedIndex,1)

    },
    deleteCountCol (state,action) {
      let findedIndex = state.count_col.findIndex((item,index) => index == action.payload)
      state.count_col.splice(findedIndex,1)
    },
    getCurrentToCurrency (state,action) {
      let foundedIndex =   state.count_row[action.payload.id].findIndex(item => item.uniqe_id == action.payload.uniqe_id)
      let foundedObj = state.count_row[action.payload.id].find(item => item.uniqe_id == action.payload.uniqe_id)
      foundedObj.value = action.payload.value
      foundedObj.amount = action.payload.amount
      console.log(action.payload);
      state.count_row[action.payload.id].splice(foundedIndex,foundedObj)
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

export const { getFromCurrency, getCountCol, getCountRow, getCurrencyAmount,deleteCountRow,getCurrentToCurrency,deleteCountCol} = currencySlice.actions

export default currencySlice.reducer