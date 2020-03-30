import React from 'react';

import AddBtn from '../shared/AddBtn';

import SetupInput from './SetupInput';
import FormSection from './FormSection';

import './FormSetup.scss';

const FormSetup = ({ formState, dispatch }) => {
	const handleCategory = e => {
		dispatch({ type: 'UPDATE_CATEGORY', value: e.target.value });
	};

	const handleNewItem = e => {
		dispatch({ type: 'ADD_ITEM' });
	};

	const handleNewScore = e => {
		dispatch({ type: 'ADD_SCORE' });
	};

	const handleUpdateItemLabel = e => {
		dispatch({
			type: 'UPDATE_ITEM_LABEL',
			value: e.target.value,
			id: e.target.id
		});
	};

	const handleUpdateScoreLabel = e => {
		dispatch({
			type: 'UPDATE_SCORE_LABEL',
			value: e.target.value,
			id: e.target.id
		});
	};

	const handleDeleteItem = id => {
		dispatch({
			type: 'DELETE_ITEM',
			id
		});
	};
	const handleDeleteScore = id => {
		dispatch({
			type: 'DELETE_SCORE',
			id
		});
	};

	return (
		<div className='form-setup'>
			<h1>Setup</h1>
			<h3>What are you ranking?</h3>
			<h4>(Ex: Shoes)</h4>
			<div className='form-setup__category'>
				<FormSection>
					<label htmlFor='category'>Category</label>
					<input
						type='text'
						id='category'
						placeholder='Category'
						onChange={handleCategory}
						value={formState.category}
					/>
				</FormSection>
			</div>
			<h3>What are your items?</h3>
			<h4>(Ex: Nike, Adidas, Reebok)</h4>
			<div className='form-setup__section'>
				<FormSection>
					{formState.items.map((item, index) => {
						return (
							<SetupInput
								key={item.id}
								handleChange={handleUpdateItemLabel}
								handleDelete={handleDeleteItem}
								item={item}
								label='Item'
								index={index}
							/>
						);
					})}
				</FormSection>
				<div className='form-setup__add-btn'>
					<AddBtn handleClick={handleNewItem} />
				</div>
			</div>

			<h3>What are your score labels?</h3>
			<h4>(Ex: Cost, Durability, Color)</h4>
			<div className='form-setup__section'>
				<FormSection>
					{formState.scoreLabels.map((score, index) => {
						return (
							<SetupInput
								key={score.id}
								handleChange={handleUpdateScoreLabel}
								handleDelete={handleDeleteScore}
								item={score}
								label='Label'
								index={index}
							/>
						);
					})}
				</FormSection>
				<div className='form-setup__add-btn'>
					<AddBtn handleClick={handleNewScore} />
				</div>
			</div>
		</div>
	);
};

export default FormSetup;
