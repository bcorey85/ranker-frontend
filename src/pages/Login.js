import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import AuthForm from '../components/auth/AuthForm';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';

import useInputState from '../hooks/useInputState';

const Login = props => {
	const [ email, setEmail ] = useInputState('');
	const [ password, setPassword ] = useInputState('');

	const login = async e => {
		e.preventDefault();

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/auth/login`,
				{ email, password }
			);

			if (response.status === 200) {
				props.history.push(`/user/${response.data.payload.id}`);
			}
		} catch (error) {
			console.log(error.response.data);
		}
	};

	return (
		<AuthForm>
			<h1>Login</h1>
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
			<NavLink to='/forgotpassword'>Reset password</NavLink>
			<NavLink to='/register'>Need an account?</NavLink>
		</AuthForm>
	);
};

export default Login;
