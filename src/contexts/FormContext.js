import React from 'react';
import axios from 'axios';

export const FormContext = React.createContext({
	formState: null,
	dispatch: null,
	saveForm: () => {}
});

export const FormProvider = props => {
	const { formState, dispatch } = props;

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
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<FormContext.Provider value={{ formState, dispatch, saveForm }}>
			{props.children}
		</FormContext.Provider>
	);
};
