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
			<h3 className='form-errorboundary'>
				Please enter at least one Score Label in Setup.
			</h3>
		);
	}

	return <React.Fragment>{children}</React.Fragment>;
};

export default FormErrorBoundary;
