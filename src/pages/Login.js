import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthForm from '../components/auth/AuthForm';
import Button from '../components/shared/Button';

const Login = () => {
	const login = () => {};

	return (
		<AuthForm>
			<form>
				<label htmlFor='email'>Email</label>
				<input type='text' placeholder='Email' id='email' />
				<label htmlFor='password'>Password</label>
				<input type='password' placeholder='Password' id='password' />
				<Button handleClick={login}>Login</Button>
			</form>
			<NavLink to='/register'>Need an account?</NavLink>
		</AuthForm>
	);
};

export default Login;
