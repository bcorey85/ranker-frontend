import React from 'react';

import AuthForm from '../components/auth/AuthForm';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';

import useInputState from '../hooks/useInputState';

const Register = () => {
	const [ email, setEmail ] = useInputState('');

	const resetPassword = () => {};

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

export default Register;
