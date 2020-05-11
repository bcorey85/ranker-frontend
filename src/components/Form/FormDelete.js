import React from 'react';

import './FormDelete.scss';
import DividerBlock from '../shared/DividerBlock';

const FormDelete = () => {
	return (
		<div className='form-delete'>
			<h1>Are you sure you want to delete this form?</h1>
			<p>(This action is can not be undone)</p>

			<DividerBlock />
		</div>
	);
};

export default FormDelete;
