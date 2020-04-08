import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthForm from '../components/auth/AuthForm';
import Button from '../components/shared/Button';

const Register = () => {
	const resetPassword = () => {};

	return (
		<AuthForm>
			<form>
				<label htmlFor='email'>Please enter your account email:</label>
				<input type='text' placeholder='Email' id='email' />
				<Button handleClick={resetPassword}>Reset Password</Button>
			</form>
		</AuthForm>
	);
};

export default Register;
