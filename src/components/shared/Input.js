import React, { useState, useContext } from 'react';

import { validate } from '../../utils/validate';
import { FormContext } from '../../contexts/FormContext';
import './Input.scss';

const Input = ({
	type,
	id,
	placeholder,
	label,
	handleChange,
	value,
	autoComplete,
	textarea,
	errorText,
	validators,
	...rest
}) => {
	const [ isTouched, setIsTouched ] = useState(false);
	const [ isValid, setIsValid ] = useState(true);
	const { handleFormValidation } = useContext(FormContext);

	const error = isTouched && !isValid;
	const errorLabel = label + ` - ${errorText}`;
	const labelElement = (
		<label
			htmlFor={id}
			className={`input__label ${error ? 'input__label--error' : ''}`}>
			{isValid ? label : errorLabel}
		</label>
	);

	const checkValidation = (e, handleChange, validators) => {
		const value = e.target.value;
		const isValid = validate(value, validators);

		setIsValid(isValid);
		handleFormValidation(isValid);
		handleChange(e);
	};

	const handleBlur = () => {
		const isValid = validate(value, validators);
		setIsValid(isValid);
		handleFormValidation(isValid);
		setIsTouched(true);
	};

	if (textarea) {
		return (
			<div className={`input ${error ? 'input--error' : ''}`}>
				{label ? labelElement : ''}
				<textarea
					id={id}
					placeholder={placeholder}
					onChange={e => checkValidation(e, handleChange, validators)}
					onBlur={handleBlur}
					value={value}
					autoComplete={autoComplete}
					{...rest}
				/>
			</div>
		);
	}

	return (
		<div className={`input ${error && 'input--error'}`}>
			{label ? labelElement : ''}
			<input
				type={type}
				id={id}
				placeholder={placeholder}
				onChange={e => checkValidation(e, handleChange, validators)}
				onBlur={handleBlur}
				value={value}
				autoComplete={autoComplete}
				{...rest}
			/>
		</div>
	);
};

export default Input;
