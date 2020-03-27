import React from 'react';

import './FormNav.scss';
const FormNav = ({ handlePageChange }) => {
	return (
		<nav className='form-nav'>
			<button
				className='form-nav__btn form-nav__btn--active'
				onClick={() => handlePageChange('Setup')}>
				Setup
			</button>
			<button
				className='form-nav__btn'
				onClick={() => handlePageChange('Input')}>
				Input
			</button>
			<button
				className='form-nav__btn'
				onClick={() => handlePageChange('Results')}>
				Results
			</button>
		</nav>
	);
};

export default FormNav;
