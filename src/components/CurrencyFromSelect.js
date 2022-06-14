import { useDispatch, useSelector } from "react-redux";
import InputMask from "react-input-mask";
import { getFromCurrency, getCurrencyAmount } from "../store/slices/currency";
import { Select } from "antd";

const CurrencyFromSelect = props => {
	const { Option } = Select;
	const currencies = useSelector(state => state.currency.currencies);
	const currency_amount = useSelector(state => state.currency.count_col[props.id - 1].currency_amount);

	const dispatch = useDispatch();

	const getCurrentFromCurrency = e => {
		dispatch(getFromCurrency(e));
	};

	const takeCurrencyAmout = e => {
		let obj = {currency_amount:Number(e.target.value),id:props.id}
		dispatch(getCurrencyAmount(obj));
	};
  
	return (
		<div className="currency_select">
			<Select
			  showSearch
				className="ant_input"
				dropdownClassName="ant_dropdown"
				defaultValue="USD"
				onChange={e => getCurrentFromCurrency(e)}
				placeholder="select currency">
				{Object.keys(currencies)?.map((item, index) => {
					return (
						<Option value={currencies[item].code} key={index}>
							{currencies[item].name}
						</Option>
					);
				})}
			</Select>
			<InputMask
				className="simple_input"
				value={currency_amount}
				onChange={e => takeCurrencyAmout(e)}
				onKeyPress={event => {
					if (!/[0-9]/.test(event.key)) {
						event.preventDefault();
					}
				}}
			/>
		</div>
	);
};

export default CurrencyFromSelect;
