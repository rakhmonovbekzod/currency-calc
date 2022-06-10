import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import InputMask from 'react-input-mask';
import { getCurrency, getCurrencyAmount } from "../store/slices/currency";
import { useMemo, useRef, useState } from "react";
import { get } from "../helpers/api";

const CurrencySelect = (props) => {
  const currencies = useSelector(state => state.currency.currencies)
  const currency_amount = useSelector(state => state.currency.currency_amount)
  const current_currency = useSelector(state => state.currency.current_currency)
  const [calcValue, setcalcValue] = useState()
  const [currency, setCurrency] = useState()
  const callBackValue = useMemo((value) => {
    return value
  }, [])

  const dispatch = useDispatch()
  const calcCurrency = (e) => {
    get(`/latest?currencies=${e.target.value || 'USD'}&base_currency=${current_currency || 'AED'}`).then(res => {
      let value = res.data.data[e.target.value].value
      setcalcValue(value)
      value = value.toFixed(2) * Number(currency_amount)
      callBackValue(value)
      setCurrency(value)
    })
  }
  const getCurrentCurrency = (e) => {
    if (props.main) {
      dispatch(getCurrency(e.target.value))
    } else {
      calcCurrency(e)
    }
  }
  const takeCurrencyAmout = (e) => {
    dispatch(getCurrencyAmount(Number(e.target.value)));
    setCurrency(calcValue * Number(e.target.value))
    console.log(currency, calcValue);
  }


  return (
    <div className='currency_select'>
      <select onChange={(e) => getCurrentCurrency(e)} placeholder="A small text input" >
        {
          Object.keys(currencies)?.map((item, index) => {
            return <option value={currencies[item].code} key={index}>{currencies[item].name}</option>
          })
        }
      </select>
      <InputMask value={!props.main ? currency : null} disabled={!props.main} onInput={(e) => takeCurrencyAmout(e)} onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }} />

    </div >
  )
}

export default CurrencySelect;