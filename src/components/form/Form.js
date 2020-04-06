import React, { useState, useReducer, useEffect } from 'react';

import FormNav from './FormNav';
import FormBody from './FormBody';
import FormFooterNav from './FormFooterNav';
import FormSetup from './FormSetup';
import FormScore from './FormScore';
import FormResults from './FormResults';

import formReducer from '../../reducers/form/formReducer';
import './Form.scss';

const Form = () => {
	const [ currentPage, setCurrentPage ] = useState('Setup');
	const [ formState, dispatch ] = useReducer(formReducer, {});
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		dispatch({
			type: 'CREATE_FORM',
			newForm: {
				numItems: 3,
				numScoreLabels: 3,
				sort: 'desc'
			}
		});

		setIsLoading(false);
	}, []);

	const formBody = (
		<React.Fragment>
			{currentPage === 'Setup' && (
				<FormSetup formState={formState} dispatch={dispatch} />
			)}
			{currentPage === 'Score' && (
				<FormScore formState={formState} dispatch={dispatch} />
			)}
			{currentPage === 'Results' && (
				<FormResults formState={formState} dispatch={dispatch} />
			)}

			<FormFooterNav
				handlePageChange={setCurrentPage}
				currentPage={currentPage}
			/>
		</React.Fragment>
	);

	return (
		<div className='form'>
			<FormNav
				handlePageChange={setCurrentPage}
				currentPage={currentPage}
			/>
			<FormBody>{isLoading ? 'Loading...' : formBody}</FormBody>
		</div>
	);
};

export default Form;
