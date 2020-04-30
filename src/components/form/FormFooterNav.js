import React, { useState, useEffect, useContext } from 'react';

import Button from '../shared/Button';

import AuthContext from '../../contexts/AuthContext';
import { FormContext } from '../../contexts/FormContext';
import './FormFooterNav.scss';

const FormFooterNav = ({ handlePageChange, currentPage }) => {
	const [ previous, setPrevious ] = useState(null);
	const [ next, setNext ] = useState(null);
	const { isLoggedIn } = useContext(AuthContext);
	const { setSaveModalOpen, isValid } = useContext(FormContext);

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

	let saveButton;
	if (isLoggedIn && !next) {
		saveButton = (
			<div>
				<Button handleClick={setSaveModalOpen} disabled={!isValid}>
					Save Form
				</Button>
			</div>
		);
	}

	let nextButton;
	if (next) {
		nextButton = (
			<div>
				{next && (
					<Button
						handleClick={() => handlePageChange(next)}
						disabled={!isValid}>
						Next
					</Button>
				)}
			</div>
		);
	} else if (isLoggedIn && !next) {
		nextButton = saveButton;
	} else {
		nextButton = <div />;
	}

	let prevButton;
	if (previous) {
		prevButton = (
			<div>
				{previous && (
					<Button
						handleClick={() => handlePageChange(previous)}
						disabled={!isValid}>
						Back
					</Button>
				)}
			</div>
		);
	} else {
		prevButton = <div />;
	}

	return (
		<nav className='form-footer-nav'>
			{prevButton}
			{nextButton}
		</nav>
	);
};

export default FormFooterNav;
