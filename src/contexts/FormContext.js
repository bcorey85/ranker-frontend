import React, { useState } from 'react';
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

	const saveForm = async (form, token) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/rank`,
				form,
				{
					headers: {
						Authorization: 'Bearer ' + token
					}
				}
			);
			return response;
		} catch (error) {
			return error.response;
		}
	};

	const handleFormValidation = isValid => {
		setIsValid(isValid);
	};

	return (
		<FormContext.Provider
			value={{
				formState,
				dispatch,
				saveForm,
				saveModalOpen,
				setSaveModalOpen,
				handleFormValidation,
				isValid
			}}>
			{props.children}
		</FormContext.Provider>
	);
};
