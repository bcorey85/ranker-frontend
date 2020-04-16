import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import './EditBtn.scss';

const EditBtn = ({ handleClick }) => {
	return (
		<div
			role='button'
			onClick={handleClick}
			tabIndex='0'
			className='edit-btn'
			aria-label='edit'>
			<FontAwesomeIcon icon={faPen} />
		</div>
	);
};

export default EditBtn;
