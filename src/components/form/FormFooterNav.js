import React, { useState, useEffect, useContext } from 'react';

import Button from '../shared/Button';

import AuthContext from '../../contexts/AuthContext';
import { FormContext } from '../../contexts/FormContext';
import './FormFooterNav.scss';

const FormFooterNav = ({ handlePageChange, currentPage }) => {
	const [ previous, setPrevious ] = useState(null);
	const [ next, setNext ] = useState(null);
	const { isLoggedIn, token } = useContext(AuthContext);
	const { formState, saveForm } = useContext(FormContext);

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

	const handleFormSave = e => {
		saveForm(formState.form, token);
	};

	let saveButton;
	if (isLoggedIn && !next) {
		saveButton = (
			<div>
				<Button handleClick={e => handleFormSave(e)}>Save Form</Button>
			</div>
		);
	}

	return (
		<nav className='form-footer-nav'>
			<div>
				{previous && (
					<Button handleClick={() => handlePageChange(previous)}>
						Back
					</Button>
				)}
			</div>
			<div>
				{next && (
					<Button handleClick={() => handlePageChange(next)}>
						Next
					</Button>
				)}
			</div>
			{saveButton}
		</nav>
	);
};

export default FormFooterNav;
