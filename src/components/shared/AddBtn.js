import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import './AddBtn.scss';

const AddBtn = ({ handleClick }) => {
	return (
		<div
			role='button'
			onClick={handleClick}
			tabIndex='0'
			className='add-btn'>
			<FontAwesomeIcon icon={faPlusCircle} />
		</div>
	);
};

export default AddBtn;
