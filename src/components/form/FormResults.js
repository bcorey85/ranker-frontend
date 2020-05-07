import React, { useEffect, useState, useContext } from 'react';

import FormResultsTable from './FormResultsTable';
import Modal from '../Modal/Modal';
import ModalContent from '../Modal/ModalContent';
import FormSave from './FormSave';
import FormErrorBoundary from './FormErrorBoundary';

import useScrollToTop from '../../hooks/useScrollToTop';
import { FormContext } from '../../contexts/FormContext';

import './FormResults.scss';
const FormResults = ({ clearLocalStorage }) => {
	useScrollToTop();
	const [ isLoading, setIsLoading ] = useState(true);
	const { dispatch, formState, saveModalOpen, setSaveModalOpen } = useContext(
		FormContext
	);

	useEffect(
		() => {
			dispatch({ type: 'CALC_RESULTS' });

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
