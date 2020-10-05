import React, { useState, useContext } from 'react';

import AddBtn from '../shared/AddBtn';

import SetupInput from './shared/SetupInput';
import FormSection from './shared/FormSection';
import FormSectionHeader from './shared/FormSectionHeader';
import Accordion from '../Accordion/Accordion';
import AccordionBody from '../Accordion/AccordionBody';
import AccordionHeader from '../Accordion/AccordionHeader';

import {
	addField,
	updateFieldLabel,
	updateWeightedAverage,
	deleteField,
	setOption
} from '../../reducers/form/formActions';
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
		dispatch(addField(field));
	};

	const handleUpdateLabel = (e, field) => {
		const value = e.target.value;
		const id = e.target.id;

		dispatch(updateFieldLabel(value, id, field));
	};

	const handleUpdateWeightedAverage = e => {
		const value = e.target.value;
		const id = e.target.dataset.id;
		dispatch(updateWeightedAverage(value, id));
	};

	const handleDeleteField = (id, field) => {
		dispatch(deleteField(id, field));
	};

	const handleSort = e => {
		const option = 'sort';
		const value = e.target.value;
		dispatch(setOption(option, value));
		setSort(e.target.value);
	};

	const handleWeightedAverages = e => {
		// Convert string to boolean
		const value = e.target.value === 'true';
		const option = 'weightedAverage';
		dispatch(setOption(option, value));

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
								handleWeightedAverageChange={e =>
									handleUpdateWeightedAverage(e)}
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
					<h4>Sort Results</h4>
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

					<h4>Toggle Weighted Averages</h4>

					<div className='form-setup__options'>
						<div onClick={handleWeightedAverages}>
							<label htmlFor='weighted-avg-off'>Off</label>
							<input
								type='radio'
								id='weighted-avg-off'
								name='weighted-avg'
								value={false}
								defaultChecked={showWeightedAverage === false}
							/>
						</div>
						<div onClick={handleWeightedAverages}>
							<label htmlFor='weighted-avg-on'>On</label>
							<input
								type='radio'
								id='weighted-avg-on'
								name='weighted-avg'
								value={true}
								defaultChecked={showWeightedAverage === true}
							/>
						</div>
					</div>
				</AccordionBody>
			</Accordion>
		</div>
	);
};

export default FormSetup;
