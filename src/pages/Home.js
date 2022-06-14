import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountCol, deleteCountCol } from "../store/slices/currency";
import CurrencyForm from "../components/CurrencyForm";
import DeleteBtn from "../components/DeleteBtn";

const Home = () => {

  const colCount = useSelector(state => state.currency.count_col)
  const dispatch = useDispatch()

  const addCol = () => {
    dispatch(getCountCol())
  }
  const deleteCol = (e) => {
    console.log(e.currentTarget.dataset.id);
    dispatch(deleteCountCol(e.currentTarget.dataset.id))
  }

  return <>
    <div className="home">
      {
        colCount.map((item, index) => (
          <div className="currency_form_wrapper" key={index}>
            <span className="delete_icon_span">
              <DeleteBtn deleteItem={(e) => deleteCol(e)} dataset={index} />
            </span>
            <CurrencyForm id={index + 1} key={item} />
          </div>
        ))
      }
      <svg
        className="add_btn"
        onClick={addCol}
        width="35" height="35"
        viewBox="0 0 48 48"><path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z">
        </path><path fill="#fff" d="M21,14h6v20h-6V14z"></path><path fill="#fff" d="M14,21h20v6H14V21z"></path>
      </svg>
    </div>
  </>
}

export default Home;