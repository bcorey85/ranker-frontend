import React, { useState, useReducer, useEffect } from 'react';

import FormNav from './FormNav';
import FormBody from './FormBody';
import FormFooterNav from './FormFooterNav';
import FormSetup from './FormSetup';
import FormScore from './FormScore';
import FormResults from './FormResults';

import { FormProvider } from '../../contexts/FormContext';
import formReducer from '../../reducers/form/formReducer';
import './Form.scss';

const Form = ({ formData }) => {
	const [ currentPage, setCurrentPage ] = useState('Setup');
	const [ formState, dispatch ] = useReducer(formReducer, {});
	const [ isLoading, setIsLoading ] = useState(true);
	useEffect(
		() => {
			if (formData) {
				dispatch({
					type: 'EDIT_FORM',
					form: formData
				});
			} else {
				dispatch({
					type: 'CREATE_FORM',
					newForm: {
						numItems: 3,
						numScoreLabels: 3,
						sort: 'desc'
					}
				});
			}

			setIsLoading(false);
		},
		[ formData ]
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	const formBody = (
		<React.Fragment>
			{currentPage === 'Setup' && <FormSetup />}
			{currentPage === 'Score' && <FormScore />}
			{currentPage === 'Results' && <FormResults />}

			<FormFooterNav
				handlePageChange={setCurrentPage}
				currentPage={currentPage}
			/>
		</React.Fragment>
	);

	return (
		<div className='form'>
			<FormProvider formState={formState} dispatch={dispatch}>
				<FormNav
					handlePageChange={setCurrentPage}
					currentPage={currentPage}
				/>

				<FormBody>{formBody}</FormBody>
			</FormProvider>
		</div>
	);
};

export default Form;
