import React, { useState, useEffect } from 'react';

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
		<div className='form-input'>
			<h1>{formState.category}</h1>
			{formState.items.map((item, itemIndex) => {
				return (
					<div key={item.id}>
						<h2>{item.label}</h2>
						{item.scores.map(score => {
							return (
								<div key={`item${itemIndex + 1}-${score.id}`}>
									<label
										htmlFor={`item${itemIndex +
											1}-${score.id}`}
									/>
									{score.label}
									<input
										type='number'
										id={`item${itemIndex + 1}-${score.id}`}
										value={score.value}
										onChange={handleUpdateScore}
										data-itemindex={item.id}
										data-scoreindex={score.id}
									/>
								</div>
							);
						})}
						{item.average}
					</div>
				);
			})}
		</div>
	);
};

export default FormInput;
