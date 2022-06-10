
import CurrencySelect from "./CurrencySelect";
import { getCountCol, getCountRow } from "../store/slices/currency";
import { useDispatch, useSelector } from "react-redux";
const CurrencyForm = () => {

  const dispatch = useDispatch()
  const rowCount = useSelector(state => state.currency.count_row)
  const addRow = () => {
    dispatch(getCountRow())
  }

  return (
    <div className="currency_form">
      < CurrencySelect main={true} />
      {
        rowCount.map((item, index) => {
          return <>
            {rowCount.length && <span className="equal_sign">=</span>}
            < CurrencySelect key={index} />
          </>
        })
      }
      <svg
        className="add_btn"
        onClick={addRow}
        width="35" height="35"
        viewBox="0 0 48 48"><path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z">
        </path><path fill="#fff" d="M21,14h6v20h-6V14z"></path><path fill="#fff" d="M14,21h20v6H14V21z"></path>
      </svg>
    </div>
  )
}

export default CurrencyForm;