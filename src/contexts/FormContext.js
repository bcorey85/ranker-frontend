import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useToggle from '../hooks/useToggle';

export const FormContext = React.createContext({
	formState: null,
	dispatch: null,
	saveForm: () => {}
});

export const FormProvider = props => {
	const { formState, dispatch } = props;
	const [ saveModalOpen, setSaveModalOpen ] = useToggle(false);
	const [ isValid, setIsValid ] = useState(true);
	const [ invalidInputs, setInvalidInputs ] = useState([]);

	const saveForm = async (form, token) => {
		console.log(form);

		try {
			let response;
			if (form.editMode === true) {
				response = await axios.put(
					`${process.env.REACT_APP_API_URL}/rank/${form._id}`,
					form,
					{
						headers: {
							Authorization: 'Bearer ' + token
						}
					}
				);
			} else {
				response = await axios.post(
					`${process.env.REACT_APP_API_URL}/rank`,
					form,
					{
						headers: {
							Authorization: 'Bearer ' + token
						}
					}
				);
			}

			return response;
		} catch (error) {
			return error.response;
		}
	};

	// Handle form validation
	useEffect(
		() => {
			if (invalidInputs.length > 0) {
				return setIsValid(false);
			}
			setIsValid(true);
		},
		[ invalidInputs ]
	);

	return (
		<FormContext.Provider
			value={{
				formState,
				dispatch,
				saveForm,
				saveModalOpen,
				setSaveModalOpen,
				isValid,
				invalidInputs,
				setInvalidInputs
			}}>
			{props.children}
		</FormContext.Provider>
	);
};
