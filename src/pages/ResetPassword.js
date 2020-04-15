import React, { useState, useContext } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

import AuthForm from '../components/Auth/AuthForm';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import MessageContainer from '../components/MessageContainer/MessageContainer';

import AuthContext from '../contexts/AuthContext';
import useInputState from '../hooks/useInputState';

const ResetPassword = props => {
	const [ password, setPassword ] = useInputState('');
	const [ confirmPassword, setConfirmPassword ] = useInputState('');
	const [ message, setMessage ] = useState({ description: '', type: '' });
	const { login } = useContext(AuthContext);
	const resetToken = props.match.params.resetToken;

	const resetPassword = async e => {
		e.preventDefault();
		try {
			const response = await axios.put(
				`${process.env
					.REACT_APP_API_URL}/auth/resetpassword/${resetToken}`,
				{ password, confirmPassword }
			);
			if (response.status === 200) {
				const { id, token } = response.data.payload;
				login(id, token);
				props.history.push(`/users/${id}`);
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
			<h1>Reset Password</h1>
			<MessageContainer
				description={message.description}
				type={message.type}
			/>
			<form>
				<Input
					type='password'
					id='password'
					placeholder='New Password'
					label='New Password'
					handleChange={setPassword}
					value={password}
				/>
				<Input
					type='password'
					id='password'
					placeholder='Confirm New Password'
					label='Confirm New Password'
					handleChange={setConfirmPassword}
					value={confirmPassword}
				/>
				<Button handleClick={resetPassword}>Reset Password</Button>
			</form>
			<NavLink to='/login'>Back to Login</NavLink>
		</AuthForm>
	);
};

export default withRouter(ResetPassword);
