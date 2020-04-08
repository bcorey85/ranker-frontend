import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthForm from '../components/auth/AuthForm';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';

import useInputState from '../hooks/useInputState';

const Login = () => {
	const [ email, setEmail ] = useInputState('');
	const [ password, setPassword ] = useInputState('');

	const login = () => {};

	return (
		<AuthForm>
			<form>
				<Input
					type='text'
					id='email'
					placeholder='Email'
					label
					handleChange={setEmail}
					value={email}
				/>
				<Input
					type='password'
					id='password'
					placeholder='Password'
					label
					handleChange={setPassword}
					value={password}
				/>
				<Button handleClick={login}>Login</Button>
			</form>
			<NavLink to='/register'>Need an account?</NavLink>
		</AuthForm>
	);
};

export default Login;
