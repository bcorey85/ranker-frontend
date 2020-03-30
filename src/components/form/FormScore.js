import React, { useState, useEffect } from 'react';

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

	return (
		<div className='form-score'>
			<h1>{formState.category}</h1>
			{formState.items.map((item, itemIndex) => {
				return (
					<div key={item.id}>
						<h2>{item.label}</h2>
						{item.scores.map((score, scoreIndex) => {
							return (
								<div
									key={`item${itemIndex + 1}-${score.id}`}
									className='form-score__group'>
									<div>
										<label
											htmlFor={`item${itemIndex +
												1}-${score.id}`}>
											Score {scoreIndex + 1}
										</label>
										<input
											type='text'
											id={`item${itemIndex +
												1}-${score.label}`}
											value={score.label}
											disabled
										/>{' '}
									</div>

									<div>
										<label
											htmlFor={`item${itemIndex +
												1}-${score.id}`}>
											Score
										</label>
										<input
											type='number'
											id={`item${itemIndex +
												1}-${score.id}`}
											value={score.value}
											onChange={handleUpdateScore}
											data-itemindex={item.id}
											data-scoreindex={score.id}
										/>
									</div>
								</div>
							);
						})}
						<div className='form-score__average'>
							<h3>
								Average: {Math.round(item.average * 100) / 100}
							</h3>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default FormInput;
