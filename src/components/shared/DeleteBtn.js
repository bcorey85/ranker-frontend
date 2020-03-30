import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './DeleteBtn.scss';
const DeleteBtn = ({ handleDelete }) => {
	return (
		<div
			role='button'
			tabIndex='0'
			onClick={handleDelete}
			className='delete-btn'
			aria-label='delete'>
			<FontAwesomeIcon icon={faTrashAlt} />
		</div>
	);
};

export default DeleteBtn;
