import React, { useEffect, useState } from 'react';

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
	return <div>results</div>;
};

export default FormResults;
