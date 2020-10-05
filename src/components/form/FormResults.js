import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import FormResultsTable from './shared/FormResultsTable';
import Modal from '../Modal/Modal';
import ModalContent from '../Modal/ModalContent';
import FormSave from './FormSave';
import FormErrorBoundary from './shared/FormErrorBoundary';

import { calcResults } from '../../reducers/form/formActions';
import useScrollToTop from '../../hooks/useScrollToTop';
import { FormContext } from '../../contexts/FormContext';
import { AuthContext } from '../../contexts/AuthContext';

import './FormResults.scss';
const FormResults = ({ clearLocalStorage }) => {
	useScrollToTop();
	const [ isLoading, setIsLoading ] = useState(true);
	const { dispatch, formState, saveModalOpen, setSaveModalOpen } = useContext(
		FormContext
	);
	const { isLoggedIn } = useContext(AuthContext);

	useEffect(
		() => {
			dispatch(calcResults());

			setIsLoading(false);
		},
		[ dispatch ]
	);

	return (
		<div className='form-results'>
			<FormErrorBoundary formState={formState}>
				<h1>Results</h1>
				{isLoading ? (
					'Loading...'
				) : (
					<FormResultsTable formData={formState.form} />
				)}
				{!isLoggedIn && (
					<p>
						<NavLink to='/register'>Sign up</NavLink> or{' '}
						<NavLink to='login'>log in</NavLink> save this form for
						later.
					</p>
				)}
				<Modal toggleModal={setSaveModalOpen} isOpen={saveModalOpen}>
					<ModalContent>
						<FormSave clearLocalStorage={clearLocalStorage} />
					</ModalContent>
				</Modal>
			</FormErrorBoundary>
		</div>
	);
};

export default FormResults;
