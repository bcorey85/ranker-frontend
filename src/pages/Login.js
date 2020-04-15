import React, { useState, useContext } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import AuthForm from '../components/Auth/AuthForm';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import MessageContainer from '../components/MessageContainer/MessageContainer';

import AuthContext from '../contexts/AuthContext';
import useInputState from '../hooks/useInputState';

const Login = props => {
	const [ email, setEmail ] = useInputState('');
	const [ password, setPassword ] = useInputState('');
	const [ message, setMessage ] = useState({ description: '', type: '' });
	const { login } = useContext(AuthContext);

	const handleLogin = async e => {
		e.preventDefault();

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/auth/login`,
				{ email, password }
			);

			if (response.status === 200) {
				const { id, token } = response.data.payload;
				login(id, token);
				props.history.push(`/users/${id}`);
			}
		} catch (error) {
			console.log(error);
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
			<MessageContainer
				description={message.description}
				type={message.type}
			/>
			<form>
				<Input
					type='text'
					id='email'
					placeholder='Email'
					label='Email'
					handleChange={setEmail}
					value={email}
					autoComplete='email'
				/>
				<Input
					type='password'
					id='password'
					placeholder='Password'
					label='Password'
					handleChange={setPassword}
					value={password}
					autoComplete='current-password'
				/>
				<Button handleClick={handleLogin}>Login</Button>
			</form>
			<NavLink to='/forgotpassword'>Reset password</NavLink>
			<NavLink to='/register'>Need an account?</NavLink>
		</AuthForm>
	);
};

export default Login;
