import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import Input from '../shared/Input';
import Button from '../shared/Button';
import MessageContainer from '../MessageContainer/MessageContainer';

import { FormContext } from '../../contexts/FormContext';
import AuthContext from '../../contexts/AuthContext';

import './FormSave.scss';

const FormSave = ({ history }) => {
	const [ message, setMessage ] = useState({ type: '', description: '' });
	const { formState, dispatch, saveForm } = useContext(FormContext);
	const { token, userId } = useContext(AuthContext);

	const handleMetaInfoChange = (e, field) => {
		dispatch({
			type: 'UPDATE_META_INFO',
			field,
			value: e.target.value
		});
	};

	const handleSaveForm = async () => {
		try {
			const response = await saveForm(formState, token);

			if (response.status === 400) {
				return setMessage({
					type: 'error',
					description: response.data.message
				});
			}
			setMessage({
				type: 'success',
				description: response.data.message
			});

			setTimeout(() => {
				history.push(`/users/${userId}`);
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='form-save'>
			<h1>Save Form</h1>
			<h3>Please enter the following information:</h3>
			<form>
				<Input
					type='date'
					placeholder='Date'
					label
					value={formState.form.date}
					handleChange={e => handleMetaInfoChange(e, 'date')}
				/>
				<Input
					type='text'
					placeholder='Title'
					label
					value={formState.form.title}
					handleChange={e => handleMetaInfoChange(e, 'title')}
				/>
				<Input
					type='text'
					placeholder='Category'
					label
					value={formState.form.category}
					handleChange={e => handleMetaInfoChange(e, 'category')}
				/>
			</form>
			<Button handleClick={handleSaveForm}>Save Form</Button>
			<MessageContainer
				description={message.description}
				type={message.type}
			/>
		</div>
	);
};

export default withRouter(FormSave);
