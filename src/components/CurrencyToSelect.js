import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { get } from "../helpers/api";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { getCurrentToCurrency } from "../store/slices/currency";

const CurrencyToSelect = (props) => {
	const { Option } = Select;
	const Input = styled.input.attrs(props => ({
		type: "text",
		size: props.size || "1em"
	}))`
		border: 2px solid palevioletred;
		margin: ${props => props.size};
		padding: ${props => props.size};
	`;

	const currencies = useSelector(state => state.currency.currencies);
	const currency_amount = useSelector(state => state.currency.count_col[props.id - 1].currency_amount);
	const current_from_currency = useSelector(state => state.currency.current_from_currency);
  let currentToValue = useSelector(state => state.currency.count_row[props.id].find(item => item.uniqe_id == props.uniqe_id).value)
	let amountToCurrency = useSelector(state => state.currency.count_row[props.id].find(item => item.uniqe_id == props.uniqe_id).amount)

	const [corvertedValueAmount, setConvertedValueAmount] = useState(amountToCurrency || 0);
  const dispatch = useDispatch()
	const calcCurrency = e => {
    let currentValue = (e || currentToValue) ?? 'RUB'
		get(`/latest?currencies=${currentValue || "RUB"}&base_currency=${current_from_currency}`).then(res => {
			let value = res.data.data[e || "RUB"].value;
			value = value * Number(currency_amount)
			let obj = {uniqe_id:props.uniqe_id,id:props.id, value:currentValue,amount:value}
			dispatch(getCurrentToCurrency(obj))
			setConvertedValueAmount(value)
		});
	};

	useEffect(() => {
		calcCurrency();
	}, []);

	useEffect(() => {
		setConvertedValueAmount((amountToCurrency * Number(currency_amount)).toFixed());
	}, [currency_amount]);

	return (
		<div className="currency_select">
			<Select showSearch className="ant_input" dropdownClassName="ant_dropdown" value={currentToValue} onChange={e => calcCurrency(e)} placeholder="select currency">
				{Object.keys(currencies)?.map((item, index) => {
					return (
						<Option value={currencies[item].code} key={index}>
							{currencies[item].name}
						</Option>
					);
				})}
			</Select>
			<Input className="simple_input" value={corvertedValueAmount} readOnly />
		</div>
	);
};

export default CurrencyToSelect;
