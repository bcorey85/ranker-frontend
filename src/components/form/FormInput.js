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

	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<div className='form-input'>
			<h1>{formState.category}</h1>
			{formState.items.map(item => {
				return (
					<div key={item.id}>
						<h2>{item.label}</h2>
						{item.scores.map(score => {
							return (
								<div key={`${item.id} ${score.id}`}>
									<h2>{score.label}</h2>
									{score.value}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default FormInput;
