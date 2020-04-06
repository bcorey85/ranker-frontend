import React, { useState } from 'react';

import AddBtn from '../shared/AddBtn';

import SetupInput from './SetupInput';
import FormSection from './FormSection';

import './FormSetup.scss';

const FormSetup = ({ formState, dispatch }) => {
	const [ sort, setSort ] = useState(formState.form.sort);

	const handleNewField = (e, field) => {
		dispatch({ type: 'ADD_FIELD', field });
	};

	const handleUpdateLabel = (e, field) => {
		dispatch({
			type: 'UPDATE_FIELD_LABEL',
			value: e.target.value,
			id: e.target.id,
			field
		});
	};

	const handleDeleteField = (id, field) => {
		dispatch({
			type: 'DELETE_FIELD',
			id,
			field
		});
	};

	const handleSort = e => {
		dispatch({ type: 'SET_SORT', sort: e.target.value });
		setSort(e.target.value);
	};

	return (
		<div className='form-setup'>
			<h1>Setup</h1>
			<h3>What are you ranking?</h3>
			<div className='form-setup__section'>
				<FormSection>
					{formState.form.items.map((item, index) => {
						return (
							<SetupInput
								key={item.id}
								handleChange={e => handleUpdateLabel(e, 'item')}
								handleDelete={() =>
									handleDeleteField(item.id, 'item')}
								item={item}
								label='Item'
								index={index}
							/>
						);
					})}
				</FormSection>
				<div className='form-setup__add-btn'>
					<AddBtn handleClick={e => handleNewField(e, 'item')} />
				</div>
			</div>

			<h3>How are you scoring?</h3>
			<div className='form-setup__section'>
				<FormSection>
					{formState.form.scoreLabels.map((score, index) => {
						return (
							<SetupInput
								key={score.id}
								handleChange={e =>
									handleUpdateLabel(e, 'scoreLabel')}
								handleDelete={() =>
									handleDeleteField(score.id, 'scoreLabel')}
								item={score}
								label='Label'
								index={index}
							/>
						);
					})}
				</FormSection>
				<div className='form-setup__add-btn'>
					<AddBtn
						handleClick={e => handleNewField(e, 'scoreLabel')}
					/>
				</div>
			</div>
			<h3>Sort Results</h3>
			<FormSection>
				<div className='form-results__sort'>
					<div onClick={handleSort}>
						<label htmlFor='desc'>High to Low</label>
						<input
							type='radio'
							id='desc'
							name='sort'
							value='desc'
							defaultChecked={sort === 'desc'}
						/>
					</div>
					<div onClick={handleSort}>
						<label htmlFor='asc'>Low to High</label>
						<input
							type='radio'
							id='asc'
							name='sort'
							value='asc'
							defaultChecked={sort === 'asc'}
						/>
					</div>
				</div>
			</FormSection>
		</div>
	);
};

export default FormSetup;
