import React, { useState, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import FormNav from './FormNav';
import FormFooterNav from './FormFooterNav';
import FormSetup from './FormSetup';
import FormScore from './FormScore';
import FormResults from './FormResults';

import formReducer from '../../reducers/formReducer';
import './Form.scss';

const score1 = {
	id: uuidv4(),
	label: '',
	average: null
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
	scoreLabels: [ score1 ]
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
		</div>
	);
};

export default Form;
