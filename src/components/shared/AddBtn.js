import React from 'react';

import './AddBtn.scss';

const AddBtn = ({ handleClick }) => {
	return (
		<div
			role='button'
			onClick={handleClick}
			className='add-btn'
			tabIndex='0'>
			add
		</div>
	);
};

export default AddBtn;
