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
									<td>
										{Math.round(item.average * 100) / 100}
									</td>
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
			{formState.scoreLabels.map(label => {
				return (
					<React.Fragment key={label.id}>
						<h3>{label.label}</h3>
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
									{label.scores.map(score => {
										return (
											<tr key={score.id}>
												<td>#</td>
												<td>{score.label}</td>
												<td>{score.score}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</FormSection>
						<div className='form-results__average'>
							<h2>
								<span>Average: </span>
								{Math.round(label.average * 100) / 100}
							</h2>
						</div>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default FormResults;
