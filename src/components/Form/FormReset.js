import React, { useContext } from 'react';

import './FormReset.scss';
import AuthContext from '../../contexts/AuthContext';
import DividerBlock from '../shared/DividerBlock';

const FormReset = () => {
	const { isLoggedIn } = useContext(AuthContext);

	let warningMessage;
	if (isLoggedIn) {
		warningMessage = 'Save current form to avoid losing progress';
	} else {
		warningMessage = 'Create an account or login to save current form';
	}

	return (
		<div className='form-reset'>
			<h1>Are you sure you want to create a new form?</h1>
			<p>{warningMessage}</p>
			<DividerBlock />
		</div>
	);
};

export default FormReset;
