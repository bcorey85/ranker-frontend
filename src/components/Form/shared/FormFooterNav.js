import React, { useState, useEffect, useContext } from 'react';

import Button from '../../shared/Button';

import AuthContext from '../../../contexts/AuthContext';
import { FormContext } from '../../../contexts/FormContext';
import './FormFooterNav.scss';

const FormFooterNav = ({ handlePageChange, currentPage }) => {
	const [ previous, setPrevious ] = useState(null);
	const [ next, setNext ] = useState(null);
	const { isLoggedIn } = useContext(AuthContext);
	const { formState, setSaveModalOpen, isValid } = useContext(FormContext);

	useEffect(
		() => {
			if (currentPage === 'Setup') {
				setPrevious(null);
				setNext('Score');
			} else if (currentPage === 'Score') {
				setPrevious('Setup');
				setNext('Results');
			} else {
				setPrevious('Score');
				setNext(null);
			}
		},
		[ currentPage ]
	);

	const emptyItemsError = formState.form.items.every(
		item => item.label === ''
	);
	const emptyScoreLabelsError = formState.form.scoreLabels.every(
		label => label.label === ''
	);

	let nextButton;
	if (next) {
		nextButton = (
			<div className='form-footer-nav__right-btn'>
				<Button
					handleClick={() => handlePageChange(next)}
					disabled={!isValid}>
					Next
				</Button>
			</div>
		);
	} else if (isLoggedIn && !next) {
		nextButton = (
			<div className='form-footer-nav__right-btn'>
				<Button handleClick={setSaveModalOpen} disabled={!isValid}>
					Save
				</Button>
			</div>
		);
	}

	let prevButton;
	if (previous) {
		prevButton = (
			<div className='form-footer-nav__left-btn'>
				<Button
					handleClick={() => handlePageChange(previous)}
					disabled={!isValid}>
					Back
				</Button>
			</div>
		);
	}

	if (currentPage !== 'Setup' && (emptyItemsError || emptyScoreLabelsError)) {
		prevButton = (
			<div className='form-footer-nav__left-btn'>
				<Button
					handleClick={() => handlePageChange('Setup')}
					disabled={!isValid}>
					Back
				</Button>
			</div>
		);
		nextButton = null;
	}

	return (
		<nav className='form-footer-nav'>
			{prevButton}
			{nextButton}
		</nav>
	);
};

export default FormFooterNav;
