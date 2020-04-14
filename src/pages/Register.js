import React, { useState, useContext } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import AuthForm from '../components/Auth/AuthForm';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import MessageContainer from '../components/MessageContainer/MessageContainer';

import AuthContext from '../contexts/AuthContext';
import useInputState from '../hooks/useInputState';

const Register = props => {
	const [ username, setUsername ] = useInputState('');
	const [ email, setEmail ] = useInputState('');
	const [ password, setPassword ] = useInputState('');
	const [ message, setMessage ] = useState({ description: '', type: '' });
	const { login } = useContext(AuthContext);

	const handleRegister = async e => {
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
				const { id, token } = response.data.payload;
				login(id, token);
				props.history.push(`/user/${id}`);
			}
		} catch (error) {
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
					autoComplete='username'
				/>
				<Input
					type='text'
					id='email'
					placeholder='Email'
					label
					handleChange={setEmail}
					value={email}
					autoComplete='email'
				/>
				<Input
					type='password'
					id='password'
					placeholder='Password'
					label
					handleChange={setPassword}
					value={password}
					autoComplete='password'
				/>

				<Button handleClick={handleRegister}>Register</Button>
			</form>
			<NavLink to='/login'>Already have an account?</NavLink>
		</AuthForm>
	);
};

export default Register;
