import React, { useState, useContext } from 'react';
import DeleteBtn from '../shared/DeleteBtn';

import { validate } from '../../utils/validate';
import { FormContext } from '../../contexts/FormContext';

import './SetupInput.scss';

const SetupInput = ({
	handleChange,
	handleDelete,
	index,
	item,
	label,
	validators,
	errorText
}) => {
	const [ isTouched, setIsTouched ] = useState(false);
	const [ isValid, setIsValid ] = useState(true);
	const error = isTouched && !isValid;
	const labelText = `${label} ${index + 1}`;
	const errorLabelText = `${label} ${index + 1} - ${errorText}`;
	const { setInvalidInputs, invalidInputs } = useContext(FormContext);

	const checkValidation = (e, handleChange, validators) => {
		const value = e.target.value;
		const id = e.target.id;

		if (validators) {
			const isValid = validate(value, validators);
			setIsValid(isValid);

			let newInvalidInputs;
			if (!isValid) {
				newInvalidInputs = [ ...invalidInputs ];
				newInvalidInputs.push(id);
			} else {
				newInvalidInputs = invalidInputs.filter(
					inputId => inputId !== id
				);
			}
			setInvalidInputs(newInvalidInputs);
		}

		handleChange(e);
	};

	const handleBlur = () => {
		setIsTouched(true);
	};

	return (
		<div className={`setup-input ${error ? 'setup-input--error' : ''}`}>
			<label htmlFor={item.id}>
				{error ? errorLabelText : labelText}
			</label>
			<div className='setup-input__group'>
				<input
					type='text'
					id={item.id}
					value={item.label}
					onChange={e => checkValidation(e, handleChange, validators)}
					onBlur={handleBlur}
				/>

				<DeleteBtn handleClick={handleDelete} />
			</div>
		</div>
	);
};

export default SetupInput;
