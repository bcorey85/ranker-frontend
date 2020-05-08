import React from 'react';

import checkEmptyForm from '../../utils/checkEmptyForm';
import './FormErrorBoundary.scss';

const FormErrorBoundary = ({ formState, children }) => {
	const emptyFormCheck = checkEmptyForm(formState.form);

	if (emptyFormCheck.itemsEmpty) {
		return (
			<div className='form-errorboundary'>
				Please enter at least one Item to rank in Setup.
			</div>
		);
	}

	if (emptyFormCheck.scoreLabelsEmpty) {
		return (
			<div className='form-errorboundary'>
				Please enter at least one Score Label in Setup.
			</div>
		);
	}

	return <React.Fragment>{children}</React.Fragment>;
};

export default FormErrorBoundary;
