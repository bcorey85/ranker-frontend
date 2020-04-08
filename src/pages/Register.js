import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthForm from '../components/auth/AuthForm';
import Button from '../components/shared/Button';

const Register = () => {
	const register = () => {};

	return (
		<AuthForm>
			<form>
				<label htmlFor='username'>Username</label>
				<input type='text' placeholder='Username' id='username' />
				<label htmlFor='email'>Email</label>
				<input type='text' placeholder='Email' id='email' />
				<label htmlFor='password'>Password</label>
				<input type='password' placeholder='Password' id='password' />
				<Button handleClick={register}>Register</Button>
			</form>
			<NavLink to='/resetpassword'>Reset password</NavLink>
			<NavLink to='/login'>Already have an account?</NavLink>
		</AuthForm>
	);
};

export default Register;
