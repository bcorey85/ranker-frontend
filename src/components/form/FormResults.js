import React, { useEffect, useState } from 'react';

import FormSection from './FormSection';
import './FormResults.scss';

const FormResults = ({ formState, dispatch }) => {
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(
		() => {
			dispatch({ type: 'CALC_LABEL_AVERAGES' });
			setIsLoading(false);
		},
		[ dispatch ]
	);

	{
		console.log(formState);
	}
	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<div>
			<h1>{formState.category} Results</h1>
			<h3>Overview</h3>
			<FormSection>
				<table className='form-results__table'>
					<thead>
						<tr>
							<th>Rank</th>
							<th>Item</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{formState.items.map(item => {
							return (
								<tr key={item.id}>
									<td>#</td>
									<td>{item.label}</td>
									<td>{item.average}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</FormSection>
			<div className='form-results__average'>
				<h2>
					<span>Average: </span>
					{formState.overallAverage}
				</h2>
			</div>
		</div>
	);
};

export default FormResults;
