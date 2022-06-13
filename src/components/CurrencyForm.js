import CurrencyFromSelect from "./CurrencyFromSelect";
import CurrencyToSelect from "./CurrencyToSelect";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {  getCountRow,deleteCountRow } from "../store/slices/currency";
import DeleteBtn from "./DeleteBtn";
const CurrencyForm = (props) => {

  const dispatch = useDispatch()
	const rowCount = useSelector(state => state.currency.count_row)
  

	const addRow = () => {
    let obj = {id:props.id,uniqe_id:Math.random()}
    dispatch(getCountRow(obj))
	};

  const deleteRow = (e) =>  {
    let obj = {id:props.id,dataset: e.currentTarget.dataset.id}
    dispatch(deleteCountRow(obj))
  }
 
	return (
		<div className="currency_form">
			<CurrencyFromSelect id={props.id} />
			{rowCount[props.id]?.map((item, index) => {
				return (
					<div className="currency_form_item">
						{rowCount.length && (
							<span key={item} className="equal_sign">
								=
							</span>
						)}
						<CurrencyToSelect id={props.id}  uniqe_id={item.uniqe_id} key={index} />
            <DeleteBtn  deleteItem={(e) => deleteRow(e)} dataset={item.uniqe_id}  />
					</div>
				);
			})}
			<svg className="add_btn" onClick={addRow} width="35" height="35" viewBox="0 0 48 48">
				<path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
				<path fill="#fff" d="M21,14h6v20h-6V14z"></path>
				<path fill="#fff" d="M14,21h20v6H14V21z"></path>
			</svg>
		</div>
	);
};

export default CurrencyForm;
