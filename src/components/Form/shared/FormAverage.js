import React from 'react';

import './FormAverage.scss';
const FormAverage = ({ average, weightedAverage, borderTop, showWeighted }) => {
	return (
		<div
			className={`form-average ${borderTop
				? 'form-average--border-top'
				: ''}`}>
			{showWeighted && (
				<React.Fragment>
					<label>Weighted Average:</label>
					<h2>{Math.round(weightedAverage * 100) / 100}</h2>
				</React.Fragment>
			)}
			{!showWeighted && (
				<React.Fragment>
					<label>Average:</label>
					<h2>{Math.round(average * 100) / 100}</h2>
				</React.Fragment>
			)}
		</div>
	);
};

export default FormAverage;
