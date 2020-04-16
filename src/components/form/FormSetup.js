import React, { useState, useContext } from 'react';

import AddBtn from '../shared/AddBtn';

import SetupInput from './SetupInput';
import FormSection from './FormSection';
import FormSectionHeader from './FormSectionHeader';

import { isUnique } from '../../utils/validate';
import { FormContext } from '../../contexts/FormContext';

import './FormSetup.scss';

const FormSetup = () => {
	const { dispatch, formState } = useContext(FormContext);

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

			<FormSectionHeader>What are you ranking?</FormSectionHeader>
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
								errorText='Please enter a unique value'
								validators={[
									isUnique(formState.form.items, 'label')
								]}
							/>
						);
					})}
				</FormSection>
				<div className='form-setup__add-btn'>
					<AddBtn handleClick={e => handleNewField(e, 'item')} />
				</div>
			</div>

			<FormSectionHeader>How are you scoring?</FormSectionHeader>
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
								errorText='Please enter a unique value'
								validators={[
									isUnique(
										formState.form.scoreLabels,
										'label'
									)
								]}
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
			<FormSectionHeader>Sort Results</FormSectionHeader>

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
