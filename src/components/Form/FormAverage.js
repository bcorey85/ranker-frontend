import React from 'react';

import './FormAverage.scss';
const FormAverage = ({ average, borderTop }) => {
	return (
		<div
			className={`form-average ${borderTop
				? 'form-average--border-top'
				: ''}`}>
			<label>Average</label>
			<h2>{Math.round(average * 100) / 100}</h2>
		</div>
	);
};

export default FormAverage;
