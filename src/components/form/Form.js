import React, { useState, useReducer, useEffect } from 'react';

import FormNav from './shared/FormNav';
import FormBody from './shared/FormBody';
import FormFooterNav from './shared/FormFooterNav';
import FormSetup from './FormSetup';
import FormScore from './FormScore';
import FormResults from './FormResults';

import checkEmptyForm from '../../utils/checkEmptyForm';
import {
	editForm,
	resumeForm,
	createForm
} from '../../reducers/form/formActions';
import { FormProvider } from '../../contexts/FormContext';
import formReducer from '../../reducers/form/formReducer';
import useLocalStorage from '../../hooks/useLocalStorage';

import './Form.scss';

const Form = ({ formData }) => {
	const [ formState, dispatch ] = useReducer(formReducer, {});
	const [ isLoading, setIsLoading ] = useState(true);
	const [ currentPage, setCurrentPage ] = useState('Setup');
	const { getLocalStorage, clearLocalStorage } = useLocalStorage(
		'RankerAppForm'
	);

	useEffect(
		() => {
			const currentForm = getLocalStorage('RankerAppForm');

			let emptyForm;
			if (currentForm) {
				emptyForm = checkEmptyForm(currentForm.form).empty;
			}

			if (formData) {
				dispatch(editForm(formData));
			} else if (currentForm !== null && !emptyForm) {
				dispatch(resumeForm(currentForm.form));
			} else {
				dispatch(
					createForm({
						numItems: 3,
						numScoreLabels: 3,
						sort: 'desc'
					})
				);
			}
			setIsLoading(false);
		},
		[ formData, getLocalStorage ]
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const formBody = (
		<React.Fragment>
			{currentPage === 'Setup' && <FormSetup />}
			{currentPage === 'Score' && <FormScore />}
			{currentPage === 'Results' && (
				<FormResults clearLocalStorage={clearLocalStorage} />
			)}

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
