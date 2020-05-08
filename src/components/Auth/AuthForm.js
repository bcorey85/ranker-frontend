import React from 'react';

import Panel from '../shared/Panel';

import './AuthForm.scss';
const AuthForm = props => {
	return (
		<div className='auth-form'>
			<Panel>{props.children}</Panel>
		</div>
	);
};

export default AuthForm;
