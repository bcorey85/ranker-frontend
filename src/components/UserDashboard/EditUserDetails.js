import React, { useState, useContext } from 'react';

import MessageContainer from '../../components/MessageContainer/MessageContainer';
import Input from '../../components/shared/Input';

import httpRequest from '../../utils/httpRequest';
import useInputState from '../../hooks/useInputState';
import Button from '../shared/Button';
import passwordUpdateValidate from '../../validators/passwordUpdateValidate';

import './EditUserDetails.scss';
import AuthContext from '../../contexts/AuthContext';

const UpdateUserDetails = ({ userData, setEditDetailsMode, history }) => {
	const [ email, setEmail ] = useInputState(userData.email);
	const [ password, setPassword ] = useInputState('');
	const [ confirmPassword, setConfirmPassword ] = useInputState('');
	const [ message, setMessage ] = useState('');
	const { token } = useContext(AuthContext);

	const submitUserDetails = async e => {
		e.preventDefault();
		const inputState = {
			email,
			password,
			confirmPassword
		};

		if (password || confirmPassword) {
			const passwordValid = passwordUpdateValidate(
				password,
				confirmPassword
			);

			if (passwordValid.type === 'error') {
				setMessage({
					type: 'error',
					description: passwordValid.description
				});

				return;
			}
		}

		try {
			const response = await httpRequest({
				method: 'put',
				url: `${process.env.REACT_APP_API_URL}/users/${userData._id}`,
				token: token,
				payload: {
					inputState
				}
			});

			if (response.type === 'error') {
				setMessage({
					type: 'error',
					description: response.description
				});

				return;
			}

			setMessage({
				type: 'success',
				description: 'User details update successful'
			});

			setTimeout(() => {
				setEditDetailsMode(false);
			}, 1000);
		} catch (error) {
			console.log(error);
			history.push('/500');
		}
	};

	return (
		<form className='edit-user-details'>
			<button onClick={() => setEditDetailsMode(false)} className='link'>
				Go Back
			</button>
			<h3>Update Details</h3>
			<Input
				type='email'
				id='email'
				value={email}
				placeholder='Email'
				label='Email'
				handleChange={setEmail}
				autoComplete='email'
			/>

			<h3>Update Password</h3>
			<Input
				type='password'
				id='password'
				value={password}
				placeholder='Password'
				label='Password'
				onChange={setPassword}
				autoComplete='new-password'
			/>
			<Input
				type='password'
				id='confirm-password'
				value={confirmPassword}
				placeholder='Confirm Password'
				label='Confirm Password'
				onChange={setConfirmPassword}
				autoComplete='confirm-new-password'
			/>

			<Button className='btn btn-primary' handleClick={submitUserDetails}>
				Submit
			</Button>
			<MessageContainer
				type={message.type}
				description={message.description}
			/>
		</form>
	);
};

export default UpdateUserDetails;
