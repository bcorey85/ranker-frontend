import React from 'react';

import DividerBlock from '../shared/DividerBlock';

const DeleteAccount = () => {
	return (
		<div className='form-delete'>
			<h1>Confirm Account Delete</h1>
			<p>This action is can not be undone!</p>
			<DividerBlock />
		</div>
	);
};

export default DeleteAccount;
