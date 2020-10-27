import React from 'react';

import './FormDelete.scss';
import DividerBlock from '../shared/DividerBlock';
import formatDate from '../../utils/formateDate';

const FormDelete = ({ formTitle, formDate }) => {
	return (
		<div className='form-delete'>
			<h1>Delete Form</h1>
			<h3>
				Title: <span>{formTitle}</span>
			</h3>
			<h3>
				Date: <span>{formatDate(formDate)}</span>
			</h3>
			<p>This action is can not be undone!</p>

			<DividerBlock />
		</div>
	);
};

export default FormDelete;
