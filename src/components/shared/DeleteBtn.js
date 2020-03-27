import React from 'react';

import './DeleteBtn.scss';
const DeleteBtn = ({ handleDelete }) => {
	return (
		<div
			role='button'
			className='delete-btn'
			tabIndex='0'
			onClick={handleDelete}>
			Delete
		</div>
	);
};

export default DeleteBtn;
