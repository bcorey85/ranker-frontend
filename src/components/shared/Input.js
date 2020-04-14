import React from 'react';

const Input = ({
	type,
	id,
	placeholder,
	label,
	handleChange,
	value,
	autoComplete
}) => {
	const labelElement = <label htmlFor={id}>{placeholder}</label>;

	return (
		<React.Fragment>
			{label ? labelElement : ''}
			<input
				type={type}
				id={id}
				placeholder={placeholder}
				onChange={handleChange}
				value={value}
				autoComplete={autoComplete}
			/>
		</React.Fragment>
	);
};

export default Input;
