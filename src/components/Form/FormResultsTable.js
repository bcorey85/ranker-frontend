import React from 'react';

import FormSection from './FormSection';
import FormSectionHeader from './FormSectionHeader';
import FormAverage from './FormAverage';
import { sort } from '../../utils/sort';

const FormResultsTable = ({ formData }) => {
	const items = sort(
		formData.items,
		formData.sort,
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

	const overview = (
		<React.Fragment>
			<FormSectionHeader>Overview</FormSectionHeader>
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
			<FormAverage average={formData.overallAverage} borderTop />
		</React.Fragment>
	);

	const scoreLabels = formData.scoreLabels.map(label => {
		return (
			<React.Fragment key={label.id}>
				<FormSectionHeader>{label.label}</FormSectionHeader>
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
							{sort(
								label.scores,
								formData.sort,
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
				<FormAverage average={label.average} borderTop />
			</React.Fragment>
		);
	});

	return (
		<React.Fragment>
			{overview}
			{scoreLabels}
		</React.Fragment>
	);
};

export default FormResultsTable;
