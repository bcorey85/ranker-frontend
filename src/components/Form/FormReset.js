import React, { useContext } from 'react';

import './FormReset.scss';
import AuthContext from '../../contexts/AuthContext';
import DividerBlock from '../shared/DividerBlock';

const FormReset = () => {
	const { isLoggedIn } = useContext(AuthContext);

	let warningMessage;
	if (isLoggedIn) {
		warningMessage =
			'(Save your current form to if you want to prevent losing progress)';
	} else {
		warningMessage =
			'(Please login and save your current form if you want to prevent losing progress)';
	}

	return (
		<div className='form-reset'>
			<h1>New Form</h1>
			<h3>Are you sure you wish to create a new form?</h3>
			<p className='form-reset__warning'>{warningMessage}</p>
			<DividerBlock />
		</div>
	);
};

export default FormReset;
