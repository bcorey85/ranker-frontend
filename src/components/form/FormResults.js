import React, { useEffect, useState, useContext } from 'react';

import FormResultsTable from './FormResultsTable';
import Modal from '../Modal/Modal';
import ModalContent from '../Modal/ModalContent';
import FormSave from './FormSave';

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

	if (formState.form.items.every(item => item.label === '')) {
		return (
			<div className='form-results'>
				Please enter at least one Item to rank in Setup.
			</div>
		);
	}

	if (formState.form.scoreLabels.every(label => label.label === '')) {
		return (
			<div className='form-results'>
				Please enter at least one Score Label in Setup.
			</div>
		);
	}

	return (
		<div className='form-results'>
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
		</div>
	);
};

export default FormResults;
