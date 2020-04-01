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

	if (isLoading) {
		return <div>Loading</div>;
	}

	if (
		formState.form.items.length === 1 &&
		formState.form.items[0].label === ''
	) {
		return (
			<div className='form-results'>
				Please enter at least one Item to rank in Setup.
			</div>
		);
	}

	if (
		formState.form.scoreLabels.length === 0 ||
		formState.form.scoreLabels[0].label === ''
	) {
		return (
			<div className='form-results'>
				Please enter at least one Score Label in Setup.
			</div>
		);
	}

	return (
		<div className='form-results'>
			<h1>Results</h1>
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
						{formState.form.items
							.sort((a, b) => b.average - a.average)
							.map((item, index) => {
								return (
									<tr key={item.id}>
										<td>{index + 1}</td>
										<td>{item.label}</td>
										<td>
											{Math.round(item.average * 100) /
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
					{Math.round(formState.form.overallAverage * 100) / 100}
				</h2>
			</div>
			{formState.form.scoreLabels.map(label => {
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
									{label.scores
										.sort((a, b) => b.score - a.score)
										.map((score, index) => {
											return (
												<tr key={score.id}>
													<td>{index + 1}</td>
													<td>{score.label}</td>
													<td>
														{Math.round(
															score.score * 100
														) / 100}
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
			})}
		</div>
	);
};

export default FormResults;
