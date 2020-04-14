import React from 'react';
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

	return (
		<FormContext.Provider
			value={{
				formState,
				dispatch,
				saveForm,
				saveModalOpen,
				setSaveModalOpen
			}}>
			{props.children}
		</FormContext.Provider>
	);
};
