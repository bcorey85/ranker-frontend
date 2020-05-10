import React, { useState, useContext } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import AuthForm from '../components/Auth/AuthForm';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import MessageContainer from '../components/MessageContainer/MessageContainer';

import { isEmail, isMinLength } from '../utils/validate';
import AuthContext from '../contexts/AuthContext';
import useInputState from '../hooks/useInputState';

const Login = props => {
	const [ email, setEmail ] = useInputState('');
	const [ password, setPassword ] = useInputState('');
	const [ message, setMessage ] = useState({ description: '', type: '' });
	const [ awaitingResponse, setAwaitingResponse ] = useState(false);
	const { login } = useContext(AuthContext);

	const handleLogin = async e => {
		e.preventDefault();
		setAwaitingResponse(true);
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/auth/login`,
				{ email, password }
			);
			setAwaitingResponse(false);
			if (response.status === 200) {
				const { id, token } = response.data.payload;
				login(id, token);
				props.history.push(`/users/${id}`);
			}
		} catch (error) {
			setAwaitingResponse(false);
			if (error.response.data.message) {
				setMessage({
					description: error.response.data.message,
					type: 'error'
				});
			}
		}
	};

	return (
		<AuthForm>
			<h1>Login</h1>

			<form>
				<Input
					type='text'
					id='email'
					label='Email'
					handleChange={setEmail}
					value={email}
					autoComplete='email'
					validators={[ isEmail() ]}
					errorText='Please enter a valid email'
				/>
				<Input
					type='password'
					id='password'
					label='Password'
					handleChange={setPassword}
					value={password}
					autoComplete='current-password'
					validators={[ isMinLength(6) ]}
					errorText='Password must be at least 6 characters'
				/>
				<MessageContainer
					description={message.description}
					type={message.type}
				/>
				<Button handleClick={handleLogin}>
					{!awaitingResponse ? 'Login' : 'Loading...'}
				</Button>
			</form>
			<NavLink to='/forgotpassword'>Reset password</NavLink>
			<NavLink to='/register'>Need an account?</NavLink>
		</AuthForm>
	);
};

export default Login;
