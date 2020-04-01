import React from 'react';

import AddBtn from '../shared/AddBtn';

import SetupInput from './SetupInput';
import FormSection from './FormSection';

import './FormSetup.scss';

const FormSetup = ({ formState, dispatch }) => {
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
	const handleDeleteScoreLabel = id => {
		dispatch({
			type: 'DELETE_SCORE_LABEL',
			id
		});
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

			<h3>How are you scoring?</h3>
			<div className='form-setup__section'>
				<FormSection>
					{formState.form.scoreLabels.map((score, index) => {
						return (
							<SetupInput
								key={score.id}
								handleChange={handleUpdateScoreLabel}
								handleDelete={handleDeleteScoreLabel}
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
