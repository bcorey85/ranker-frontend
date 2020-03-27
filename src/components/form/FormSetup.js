import React from 'react';

import AddBtn from '../shared/AddBtn';

import SetupInput from './SetupInput';

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

	const handleUpdateItem = e => {
		dispatch({
			type: 'UPDATE_ITEM',
			value: e.target.value,
			id: e.target.id
		});
	};

	const handleUpdateScore = e => {
		dispatch({
			type: 'UPDATE_SCORE',
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
			{/* <h2>Setup Style</h2>
			<div className='form__setup'>
				<label htmlFor='quick'>Quick</label>
				<input type='radio' id='quick' name='setup' value='quick' />
				<label htmlFor='Flexible'>Flexible</label>
				<input
					type='radio'
					id='flexible'
					name='setup'
					value='flexible'
				/>
			</div> */}
			<h2>What are you ranking?</h2>
			<div className='form__category'>
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
			<div className='form__section'>
				{formState.items.map((item, index) => {
					return (
						<SetupInput
							handleChange={handleUpdateItem}
							handleDelete={handleDeleteItem}
							item={item}
							label='Item'
							index={index}
						/>
					);
				})}
				<div className='form__add-btn'>
					<AddBtn handleClick={handleNewItem} />
				</div>
			</div>

			<h2>What are you scoring by?</h2>
			<div className='form__section'>
				{formState.scores.map((score, index) => {
					return (
						<SetupInput
							handleChange={handleUpdateScore}
							handleDelete={handleDeleteScore}
							item={score}
							label='Score'
							index={index}
						/>
					);
				})}
				<div className='form__add-btn'>
					<AddBtn handleClick={handleNewScore} />
				</div>
			</div>
		</div>
	);
};

export default FormSetup;
