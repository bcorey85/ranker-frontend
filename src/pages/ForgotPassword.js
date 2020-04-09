import React, { useState } from 'react';
import axios from 'axios';

import AuthForm from '../components/auth/AuthForm';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';

import useInputState from '../hooks/useInputState';

const ForgotPassword = () => {
	const [ email, setEmail ] = useInputState('');
	const [ responseSent, setResponseSent ] = useState(false);

	const resetPassword = async e => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/auth/forgotpassword`,
				{ email }
			);

			setResponseSent(true);
		} catch (error) {
			console.log(error.response);
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
