import React from 'react';

import './FormDelete.scss';

const FormDelete = () => {
	return (
		<div className='form-delete'>
			<h1>Delete Form</h1>
			<h3>Are you sure you wish to delete this form?</h3>
			<p>(This action is can not be undone.)</p>
		</div>
	);
};

export default FormDelete;
