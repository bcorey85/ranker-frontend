import React, { useContext } from 'react';

import './FormNav.scss';
import { FormContext } from '../../../contexts/FormContext';
const FormNav = ({ handlePageChange, currentPage }) => {
	const { isValid } = useContext(FormContext);

	return (
		<nav className='form-nav'>
			<button
				className={`form-nav__btn ${currentPage === 'Setup'
					? 'form-nav__btn--active'
					: ''}`}
				onClick={() => handlePageChange('Setup')}
				disabled={!isValid}>
				Setup
			</button>
			<button
				className={`form-nav__btn ${currentPage === 'Score'
					? 'form-nav__btn--active'
					: ''}`}
				onClick={() => handlePageChange('Score')}
				disabled={!isValid}>
				Score
			</button>
			<button
				className={`form-nav__btn ${currentPage === 'Results'
					? 'form-nav__btn--active'
					: ''}`}
				onClick={() => handlePageChange('Results')}
				disabled={!isValid}>
				Results
			</button>
		</nav>
	);
};

export default FormNav;
