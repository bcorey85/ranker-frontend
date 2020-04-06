import React, { useEffect, useState } from 'react';

import FormSection from './FormSection';

import { sortScores } from '../../utils/formUtils';
import './FormResults.scss';

const FormResults = ({ formState, dispatch }) => {
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(
		() => {
			dispatch({ type: 'CALC_RESULTS' });

			setIsLoading(false);
		},
		[ dispatch ]
	);

	if (formState.form.items.every(item => item.label === '')) {
		return (
			<div className='form-results'>
				Please enter at least one Item to rank in Setup.
			</div>
		);
	}

	if (formState.form.scoreLabels.every(label => label.label === '')) {
		return (
			<div className='form-results'>
				Please enter at least one Score Label in Setup.
			</div>
		);
	}

	const items = sortScores(
		formState.form.items,
		formState.form.sort,
		'average'
	).map((item, index) => {
		return (
			<tr key={item.id}>
				<td>{index + 1}</td>
				<td>{item.label}</td>
				<td>{Math.round(item.average * 100) / 100}</td>
			</tr>
		);
	});

	const scoreLabels = formState.form.scoreLabels.map(label => {
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
							{sortScores(
								label.scores,
								formState.form.sort,
								'score'
							).map((score, index) => {
								return (
									<tr key={score.id}>
										<td>{index + 1}</td>
										<td>{score.label}</td>
										<td>
											{Math.round(score.score * 100) /
												100}
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
						{Math.round(label.average * 100) / 100}
					</h2>
				</div>
			</React.Fragment>
		);
	});

	const results = (
		<React.Fragment>
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
					<tbody>{items}</tbody>
				</table>
			</FormSection>
			<div className='form-results__average'>
				<h2>
					<span>Average: </span>
					{Math.round(formState.form.overallAverage * 100) / 100}
				</h2>
			</div>
			{scoreLabels}
		</React.Fragment>
	);

	return (
		<div className='form-results'>
			<h1>Results</h1>
			{isLoading ? 'Loading...' : results}
		</div>
	);
};

export default FormResults;
