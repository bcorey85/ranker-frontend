import React, { useState, useEffect } from 'react';

import FormSection from './FormSection';

import './FormScore.scss';

const FormInput = ({ formState, dispatch }) => {
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(
		() => {
			dispatch({ type: 'MAP_SCORES' });
			setIsLoading(false);
		},
		[ dispatch ]
	);

	const handleUpdateScore = e => {
		dispatch({
			type: 'UPDATE_ITEM_SCORE',
			value: e.target.value,
			scoreId: e.target.dataset.scoreindex,
			itemId: e.target.dataset.itemindex
		});
	};

	if (isLoading) {
		return <div>Loading</div>;
	}

	if (formState.category === '') {
		return (
			<div className='form-score'>Please enter a Category in Setup.</div>
		);
	}

	if (formState.items.length === 1 && formState.items[0].label === '') {
		return (
			<div className='form-score'>
				Please enter at least one Item to rank in Setup.
			</div>
		);
	}

	if (
		formState.scoreLabels.length === 1 &&
		formState.scoreLabels.label === ''
	) {
		return (
			<div className='form-score'>
				Please enter at least one Score Label in Setup.
			</div>
		);
	}

	return (
		<div className='form-score'>
			<h1>{formState.category}</h1>
			{formState.items.map((item, itemIndex) => {
				return (
					<div key={item.id}>
						<h3>{item.label}</h3>
						<FormSection>
							{item.scores.map((score, scoreIndex) => {
								return (
									<React.Fragment
										key={`item${itemIndex +
											1}-${score.id}`}>
										<label
											htmlFor={`item${itemIndex +
												1}-${score.id}`}>
											{score.label}
										</label>
										<input
											type='number'
											id={`item${itemIndex +
												1}-${score.id}`}
											value={score.score}
											onChange={handleUpdateScore}
											data-itemindex={item.id}
											data-scoreindex={score.id}
										/>
									</React.Fragment>
								);
							})}
						</FormSection>
						<div className='form-score__average'>
							<h2>
								<span>Average: </span>
								{Math.round(item.average * 100) / 100}
							</h2>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default FormInput;
