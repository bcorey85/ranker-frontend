import React, { useState, useContext } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

import AuthForm from '../components/Auth/AuthForm';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import MessageContainer from '../components/MessageContainer/MessageContainer';

import AuthContext from '../contexts/AuthContext';
import useInputState from '../hooks/useInputState';

import './ResetPassword.scss';

const ResetPassword = props => {
	const [ password, setPassword ] = useInputState('');
	const [ confirmPassword, setConfirmPassword ] = useInputState('');
	const [ message, setMessage ] = useState({ description: '', type: '' });
	const [ awaitingResponse, setAwaitingResponse ] = useState(false);
	const { login } = useContext(AuthContext);
	const resetToken = props.match.params.resetToken;

	const resetPassword = async e => {
		setAwaitingResponse(true);
		e.preventDefault();
		try {
			const response = await axios.put(
				`${process.env
					.REACT_APP_API_URL}/auth/resetpassword/${resetToken}`,
				{ password, confirmPassword }
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
		<div className='reset-password'>
			<AuthForm>
				<h1>Reset Password</h1>

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
						id='confirm-password'
						placeholder='Confirm New Password'
						label='Confirm New Password'
						handleChange={setConfirmPassword}
						value={confirmPassword}
					/>
					<MessageContainer
						description={message.description}
						type={message.type}
					/>
					<Button handleClick={resetPassword}>
						{!awaitingResponse ? 'Reset Password' : 'Loading...'}
					</Button>
				</form>
				<NavLink to='/login'>Back to Login</NavLink>
			</AuthForm>
		</div>
	);
};

export default withRouter(ResetPassword);
