import React from 'react';

import './FormNav.scss';
const FormNav = () => {
	return (
		<nav className='form-nav'>
			<button className='form-nav__btn'>Setup</button>
			<button className='form-nav__btn'>Input</button>
			<button className='form-nav__btn'>Results</button>
		</nav>
	);
};

export default FormNav;
