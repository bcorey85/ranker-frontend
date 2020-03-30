import React from 'react';

import AddBtn from '../shared/AddBtn';

import SetupInput from './SetupInput';

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
			<h2>What are you ranking?</h2>
			<div className='form-setup__category'>
				<label htmlFor='category'>Category</label>
				<input
					type='text'
					id='category'
					placeholder='Category'
					onChange={handleCategory}
					value={formState.category}
				/>
			</div>
			<h2>What items are you ranking?</h2>
			<div className='form-setup__section'>
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
				<div className='form-setup__add-btn'>
					<AddBtn handleClick={handleNewItem} />
				</div>
			</div>

			<h2>What are you score labels?</h2>
			<div className='form-setup__section'>
				{formState.scoreLabels.map((score, index) => {
					return (
						<SetupInput
							key={score.id}
							handleChange={handleUpdateScoreLabel}
							handleDelete={handleDeleteScore}
							item={score}
							label='Score Label'
							index={index}
						/>
					);
				})}
				<div className='form-setup__add-btn'>
					<AddBtn handleClick={handleNewScore} />
				</div>
			</div>
		</div>
	);
};

export default FormSetup;
