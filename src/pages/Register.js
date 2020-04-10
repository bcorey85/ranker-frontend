import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import AuthForm from '../components/auth/AuthForm';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import MessageContainer from '../components/MessageContainer/MessageContainer';

import useInputState from '../hooks/useInputState';

const Register = props => {
	const [ username, setUsername ] = useInputState('');
	const [ email, setEmail ] = useInputState('');
	const [ password, setPassword ] = useInputState('');
	const [ message, setMessage ] = useState({ description: '', type: '' });

	const register = async e => {
		e.preventDefault();
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

			if (response.status === 201) {
				props.history.push(`/user/${response.data.payload.id}`);
			}
		} catch (error) {
			console.log(error.response);
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
			<MessageContainer
				description={message.description}
				type={message.type}
			/>
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
			<NavLink to='/login'>Already have an account?</NavLink>
		</AuthForm>
	);
};

export default Register;
