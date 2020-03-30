import React from 'react';

import './FormNav.scss';
const FormNav = ({ handlePageChange, currentPage }) => {
	return (
		<nav className='form-nav'>
			<button
				className={`form-nav__btn ${currentPage === 'Setup' &&
					'form-nav__btn--active'}`}
				onClick={() => handlePageChange('Setup')}>
				Setup
			</button>
			<button
				className={`form-nav__btn ${currentPage === 'Score' &&
					'form-nav__btn--active'}`}
				onClick={() => handlePageChange('Score')}>
				Score
			</button>
			<button
				className={`form-nav__btn ${currentPage === 'Results' &&
					'form-nav__btn--active'}`}
				onClick={() => handlePageChange('Results')}>
				Results
			</button>
		</nav>
	);
};

export default FormNav;
