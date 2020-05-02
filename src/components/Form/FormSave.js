import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Input from '../shared/Input';
import Button from '../shared/Button';
import MessageContainer from '../MessageContainer/MessageContainer';

import HttpRequest from '../../utils/httpRequest';
import { FormContext } from '../../contexts/FormContext';
import AuthContext from '../../contexts/AuthContext';

import './FormSave.scss';

const FormSave = ({ history, clearLocalStorage }) => {
	const [ message, setMessage ] = useState({ type: '', description: '' });
	const [ userData, setUserData ] = useState({});
	const [ isLoading, setIsLoading ] = useState(true);
	const [ existingCategory, setExistingCategory ] = useState('');
	const [ newCategory, setNewCategory ] = useState('');
	const { formState, dispatch, saveForm } = useContext(FormContext);
	const { token, userId } = useContext(AuthContext);

	useEffect(
		() => {
			const getData = async () => {
				try {
					const response = await HttpRequest({
						method: 'get',
						url: `${process.env.REACT_APP_API_URL}/users/${userId}`
					});
					setUserData(response.data.payload);
					setIsLoading(false);
				} catch (error) {
					console.log(error);
				}
			};
			getData();
		},
		[ userId ]
	);

	const handleMetaInfoChange = (e, field) => {
		dispatch({
			type: 'UPDATE_META_INFO',
			field,
			value: e.target.value
		});
	};

	const handleCategory = (e, field) => {
		if (field === 'new') {
			setExistingCategory('');
			setNewCategory(e.target.value);
		} else {
			setNewCategory('');
			setExistingCategory(e.target.value);
		}
		handleMetaInfoChange(e, 'category');
	};

	const handleSaveForm = async () => {
		try {
			const response = await saveForm(formState.form, token);

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

			clearLocalStorage();
		} catch (error) {
			console.log(error);
		}
	};

	if (isLoading) {
		return (
			<div className='form-save'>
				<h1>Save Form</h1>
				Loading user profile...
				<MessageContainer
					description={message.description}
					type={message.type}
				/>
			</div>
		);
	}

	return (
		<div className='form-save'>
			<h1>Save Form</h1>
			<h3>Please enter the following:</h3>
			<form>
				<Input
					type='date'
					placeholder='Date'
					label='Date'
					value={formState.form.date}
					handleChange={e => handleMetaInfoChange(e, 'date')}
				/>
				<Input
					type='text'
					placeholder='Title'
					label='Title'
					value={formState.form.title}
					handleChange={e => handleMetaInfoChange(e, 'title')}
				/>
				<label htmlFor='existing-category'>Existing Category</label>
				<select
					name='existing-category'
					id='existing-category'
					onChange={e => handleCategory(e, 'existing')}
					value={existingCategory}>
					<option value='' />
					{userData.categories.map(category => {
						return (
							<option value={category} key={category}>
								{category}
							</option>
						);
					})}
				</select>
				<Input
					type='text'
					placeholder='New Category'
					label='New Category'
					value={newCategory}
					handleChange={e => handleCategory(e, 'new')}
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
