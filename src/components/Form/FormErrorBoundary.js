import React from 'react';

import './FormErrorBoundary.scss';

const FormErrorBoundary = ({ formState, children }) => {
	if (formState.form.items.every(item => item.label === '')) {
		return (
			<div className='form-errorboundary'>
				Please enter at least one Item to rank in Setup.
			</div>
		);
	}

	if (formState.form.scoreLabels.every(label => label.label === '')) {
		return (
			<div className='form-errorboundary'>
				Please enter at least one Score Label in Setup.
			</div>
		);
	}

	return <React.Fragment>{children}</React.Fragment>;
};

export default FormErrorBoundary;
