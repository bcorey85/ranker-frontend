import React, { useState, useContext } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import AuthForm from '../components/Auth/AuthForm';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import MessageContainer from '../components/MessageContainer/MessageContainer';

import { isRequired, isEmail, isMinLength } from '../utils/validate';
import AuthContext from '../contexts/AuthContext';
import useInputState from '../hooks/useInputState';

const Register = props => {
	const [ username, setUsername ] = useInputState('');
	const [ email, setEmail ] = useInputState('');
	const [ password, setPassword ] = useInputState('');
	const [ message, setMessage ] = useState({ description: '', type: '' });
	const [ awaitingResponse, setAwaitingResponse ] = useState(false);
	const { login } = useContext(AuthContext);

	const handleRegister = async e => {
		e.preventDefault();
		setAwaitingResponse(true);
		const newUser = {
			username,
			email,
			password
		};
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/auth/register`,
				newUser
			);
			setAwaitingResponse(false);

			if (response.status === 201) {
				const { id, token } = response.data.payload;
				login(id, token);
				props.history.push(`/user/${id}`);
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
			<h1>Register</h1>

			<form>
				<Input
					type='text'
					id='username'
					label='Username'
					handleChange={setUsername}
					value={username}
					autoComplete='username'
					validators={[ isRequired() ]}
					errorText='Please enter a username'
				/>
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
					autoComplete='password'
					validators={[ isMinLength(6) ]}
					errorText='Password must be at least 6 characters'
				/>
				<MessageContainer
					description={message.description}
					type={message.type}
				/>

				<Button handleClick={handleRegister}>
					{!awaitingResponse ? 'Register' : 'Loading...'}
				</Button>
			</form>
			<NavLink to='/login'>Already have an account?</NavLink>
		</AuthForm>
	);
};

export default Register;
