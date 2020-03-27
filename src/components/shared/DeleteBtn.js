import React from 'react';

import './DeleteBtn.scss';
const DeleteBtn = ({ handleDelete }) => {
	return (
		<div
			role='button'
			className='delete-btn'
			tabIndex='0'
			onClick={handleDelete}>
			del
		</div>
	);
};

export default DeleteBtn;
