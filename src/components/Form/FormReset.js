import React, { useContext } from 'react';

import './FormReset.scss';
import AuthContext from '../../contexts/AuthContext';

const FormReset = () => {
	const { isLoggedIn } = useContext(AuthContext);

	let warningMessage;
	if (isLoggedIn) {
		warningMessage = 'Save your current form to prevent losing data';
	} else {
		warningMessage =
			'Please login and save your current form to prevent losing data';
	}

	return (
		<div className='form-reset'>
			<h1>New Form</h1>
			<h3>Are you sure you wish to create a new form?</h3>
			<p className='form-reset__warning'>{warningMessage}</p>
		</div>
	);
};

export default FormReset;
