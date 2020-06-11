import React, { useState, useContext } from 'react';

import MessageContainer from '../../components/MessageContainer/MessageContainer';
import Input from '../../components/shared/Input';
import Button from '../shared/Button';
import Panel from '../shared/Panel';
import Modal from '../Modal/Modal';
import ModalContent from '../Modal/ModalContent';
import ModalControls from '../Modal/ModalControls';
import DeleteAccount from './DeleteAccount';

import httpRequest from '../../utils/httpRequest';
import useInputState from '../../hooks/useInputState';
import useToggle from '../../hooks/useToggle';
import passwordUpdateValidate from '../../validators/passwordUpdateValidate';
import AuthContext from '../../contexts/AuthContext';
import './EditUserDetails.scss';

const UpdateUserDetails = ({ userData, setEditDetailsMode, history }) => {
	const [ email, setEmail ] = useInputState(userData.email);
	const [ password, setPassword ] = useInputState('');
	const [ confirmPassword, setConfirmPassword ] = useInputState('');
	const [ deleteModalOpen, setDeleteModalOpen ] = useToggle(false);
	const [ message, setMessage ] = useState('');
	const { token, logout } = useContext(AuthContext);

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

	const handleDeleteAccount = async e => {
		e.preventDefault();

		try {
			const response = await httpRequest({
				method: 'delete',
				url: `${process.env.REACT_APP_API_URL}/users/${userData._id}`,
				token: token
			});

			if (response.type === 'error') {
				setMessage({
					type: 'error',
					description: response.description
				});

				return;
			}
			logout();
		} catch (error) {
			console.log(error);
			history.push('/500');
		}
	};

	return (
		<div className='edit-user-details'>
			<Panel>
				<form>
					<button
						onClick={() => setEditDetailsMode(false)}
						className='link'>
						Go Back
					</button>

					<h3>Update Details</h3>
					<Input
						type='email'
						id='email'
						value={email}
						label='Email'
						handleChange={setEmail}
						autoComplete='email'
					/>

					<h3>Update Password</h3>
					<Input
						type='password'
						id='password'
						value={password}
						label='Password'
						onChange={setPassword}
						autoComplete='new-password'
					/>
					<Input
						type='password'
						id='confirm-password'
						value={confirmPassword}
						label='Confirm Password'
						onChange={setConfirmPassword}
						autoComplete='confirm-new-password'
					/>
					<div className='edit-user-details__submit'>
						<Button handleClick={submitUserDetails}>Submit</Button>
					</div>
					<MessageContainer
						type={message.type}
						description={message.description}
					/>
				</form>
				<div className='edit-user-details__delete'>
					<button
						className='link--delete'
						onClick={setDeleteModalOpen}>
						Delete Account
					</button>
				</div>
				<Modal
					toggleModal={setDeleteModalOpen}
					isOpen={deleteModalOpen}>
					<ModalContent>
						<DeleteAccount />
						<ModalControls>
							<Button handleClick={setDeleteModalOpen}>
								Cancel
							</Button>
							<Button
								handleClick={handleDeleteAccount}
								type='delete'>
								Delete
							</Button>
						</ModalControls>
					</ModalContent>
				</Modal>
			</Panel>
		</div>
	);
};

export default UpdateUserDetails;
