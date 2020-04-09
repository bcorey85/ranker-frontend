import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthForm from '../components/auth/AuthForm';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';

import useInputState from '../hooks/useInputState';

const Register = () => {
	const [ username, setUsername ] = useInputState('');
	const [ email, setEmail ] = useInputState('');
	const [ password, setPassword ] = useInputState('');

	const register = () => {};

	return (
		<AuthForm>
			<h1>Register</h1>
			<form>
				<Input
					type='text'
					id='username'
					placeholder='Username'
					label
					handleChange={setUsername}
					value={username}
				/>
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

				<Button handleClick={register}>Register</Button>
			</form>
			<NavLink to='/resetpassword'>Reset password</NavLink>
			<NavLink to='/login'>Already have an account?</NavLink>
		</AuthForm>
	);
};

export default Register;
