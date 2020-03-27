import React, { useState, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import FormNav from './FormNav';
import FormFooterNav from './FormFooterNav';
import FormSetup from './FormSetup';
import FormInput from './FormInput';
import FormResults from './FormResults';

import formReducer from '../../reducers/formReducer';
import './Form.scss';

const score1 = {
	id: uuidv4(),
	label: '',
	score: ''
};

const item1 = {
	id: uuidv4(),
	label: '',
	scores: [],
	average: null,
	rank: null
};

const initialState = {
	category: '',
	items: [ item1 ],
	scores: [ score1 ]
};

const Form = () => {
	const [ currentPage, setCurrentPage ] = useState('Setup');
	const [ formState, dispatch ] = useReducer(formReducer, initialState);

	return (
		<div className='form'>
			<FormNav handlePageChange={setCurrentPage} />

			{currentPage === 'Setup' && (
				<FormSetup formState={formState} dispatch={dispatch} />
			)}
			{currentPage === 'Input' && (
				<FormInput formState={formState} dispatch={dispatch} />
			)}
			{currentPage === 'Results' && (
				<FormResults formState={formState} dispatch={dispatch} />
			)}

			<FormFooterNav
				handlePageChange={setCurrentPage}
				currentPage={currentPage}
			/>
		</div>
	);
};

export default Form;
