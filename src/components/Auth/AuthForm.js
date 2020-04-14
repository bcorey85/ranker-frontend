import React from 'react';

import './AuthForm.scss';
const AuthForm = props => {
	return <div className='auth-form'>{props.children}</div>;
};

export default AuthForm;
