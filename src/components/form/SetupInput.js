import React from 'react';

import DeleteBtn from '../shared/DeleteBtn';

import './SetupInput.scss';

const SetupInput = ({ handleChange, handleDelete, index, item, label }) => {
	return (
		<div className='setup-input'>
			<label htmlFor={item.id}>
				{label} {index + 1}
			</label>
			<div className='setup-input__group'>
				<input
					type='text'
					id={item.id}
					placeholder={`${label} ${index + 1}`}
					value={item.label}
					onChange={handleChange}
				/>
				<DeleteBtn handleDelete={handleDelete} />
			</div>
		</div>
	);
};

export default SetupInput;
