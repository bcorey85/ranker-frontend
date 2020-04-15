import React, { useState } from 'react';

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
	const error = isTouched && !isValid;
	const errorLabel = label + ` - ${errorText}`;
	const labelElement = (
		<label
			htmlFor={id}
			className={`input__label ${error && 'input__label--error'}`}>
			{isValid ? label : errorLabel}
		</label>
	);

	const validate = (e, handleChange, validators) => {
		const value = e.target.value;

		let isValid = true;
		if (validators) {
			isValid = validators.map(validator => validator(value));
		}

		setIsValid(isValid);
		handleChange(e);
	};

	const handleBlur = () => {
		setIsTouched(true);
	};

	if (textarea) {
		return (
			<div className={`input ${error && 'input--error'}`}>
				{label ? labelElement : ''}
				<textarea
					id={id}
					placeholder={placeholder}
					onChange={e => validate(e, handleChange, validators)}
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
				onChange={e => validate(e, handleChange)}
				onBlur={handleBlur}
				value={value}
				autoComplete={autoComplete}
				{...rest}
			/>
		</div>
	);
};

export default Input;
