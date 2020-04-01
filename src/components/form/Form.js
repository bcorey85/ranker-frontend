import React, { useState, useReducer } from 'react';
import { RankForm } from '../../classes/FormClasses';

import FormNav from './FormNav';
import FormBody from './FormBody';
import FormFooterNav from './FormFooterNav';
import FormSetup from './FormSetup';
import FormScore from './FormScore';
import FormResults from './FormResults';

import formReducer from '../../reducers/formReducer';
import './Form.scss';

const initialState = {
	form: new RankForm()
};

const Form = () => {
	const [ currentPage, setCurrentPage ] = useState('Setup');
	const [ formState, dispatch ] = useReducer(formReducer, initialState);

	return (
		<div className='form'>
			<FormNav
				handlePageChange={setCurrentPage}
				currentPage={currentPage}
			/>
			<FormBody>
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
			</FormBody>
		</div>
	);
};

export default Form;
