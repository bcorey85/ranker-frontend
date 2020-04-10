import React, { useState } from 'react';
import axios from 'axios';

import AuthForm from '../components/auth/AuthForm';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import MessageContainer from '../components/MessageContainer/MessageContainer';

import useInputState from '../hooks/useInputState';

const ForgotPassword = () => {
	const [ email, setEmail ] = useInputState('');
	const [ responseSent, setResponseSent ] = useState(false);
	const [ message, setMessage ] = useState({ description: '', type: '' });

	const resetPassword = async e => {
		e.preventDefault();
		try {
			await axios.post(
				`${process.env.REACT_APP_API_URL}/auth/forgotpassword`,
				{ email }
			);

			setResponseSent(true);
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

	if (responseSent) {
		return (
			<AuthForm>
				<h1>Reset Password</h1>
				Please check your email for link to reset your password. Thank
				you!
			</AuthForm>
		);
	}

	return (
		<AuthForm>
			<h1>Reset Password</h1>
			<MessageContainer
				description={message.description}
				type={message.type}
			/>
			<form>
				<Input
					type='text'
					id='email'
					placeholder='Email'
					label
					handleChange={setEmail}
					value={email}
				/>
				<Button handleClick={resetPassword}>Reset Password</Button>
			</form>
		</AuthForm>
	);
};

export default ForgotPassword;
