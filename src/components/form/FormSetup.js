import React, { useState, useContext } from 'react';

import AddBtn from '../shared/AddBtn';

import SetupInput from './SetupInput';
import FormSection from './FormSection';
import FormSectionHeader from './FormSectionHeader';
import Accordion from '../Accordion/Accordion';
import AccordionBody from '../Accordion/AccordionBody';
import AccordionHeader from '../Accordion/AccordionHeader';

import { isUnique } from '../../utils/validate';
import { FormContext } from '../../contexts/FormContext';
import useScrollToTop from '../../hooks/useScrollToTop';

import './FormSetup.scss';

const FormSetup = () => {
	useScrollToTop();

	const { dispatch, formState } = useContext(FormContext);
	const [ sort, setSort ] = useState(formState.form.options.sort || 'asc');
	const [ showWeightedAverage, setShowWeightedAverage ] = useState(
		formState.form.options.weightedAverage || false
	);
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

	const handleUpdateweightedAverage = e => {
		dispatch({
			type: 'UPDATE_WEIGHTED_AVG',
			value: e.target.value,
			id: e.target.id
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
		dispatch({ type: 'SET_OPTION', option: 'sort', value: e.target.value });
		setSort(e.target.value);
	};

	const handleWeightedAverages = e => {
		// Convert string to boolean
		const value = e.target.value === 'true';
		dispatch({
			type: 'SET_OPTION',
			option: 'weightedAverage',
			value
		});
		setShowWeightedAverage(value);
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
								handleweightedAverageChange={e =>
									handleUpdateweightedAverage(e)}
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
								showWeightedAverage={showWeightedAverage}
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
			<Accordion>
				<AccordionHeader>
					<h3>Advanced Options</h3>
				</AccordionHeader>
				<AccordionBody>
					<FormSectionHeader>Sort Results</FormSectionHeader>

					<FormSection>
						<div className='form-setup__options'>
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
					<FormSectionHeader>
						Toggle Weighted Averages
					</FormSectionHeader>
					<FormSection>
						<div className='form-setup__options'>
							<div onClick={handleWeightedAverages}>
								<label htmlFor='weighted-avg-off'>Off</label>
								<input
									type='radio'
									id='weighted-avg-off'
									name='weighted-avg'
									value={false}
									defaultChecked={
										showWeightedAverage === false
									}
								/>
							</div>
							<div onClick={handleWeightedAverages}>
								<label htmlFor='weighted-avg-on'>On</label>
								<input
									type='radio'
									id='weighted-avg-on'
									name='weighted-avg'
									value={true}
									defaultChecked={
										showWeightedAverage === true
									}
								/>
							</div>
						</div>
					</FormSection>
				</AccordionBody>
			</Accordion>
		</div>
	);
};

export default FormSetup;
