import React, { useState, useEffect } from 'react';

import './FormFooterNav.scss';

const FormFooterNav = ({ handlePageChange, currentPage }) => {
	const [ previous, setPrevious ] = useState(null);
	const [ next, setNext ] = useState(null);

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

	return (
		<nav className='form-footer-nav'>
			<div>
				{previous && (
					<button onClick={() => handlePageChange(previous)}>
						Back
					</button>
				)}
			</div>
			<div>
				{next && (
					<button onClick={() => handlePageChange(next)}>Next</button>
				)}
			</div>
		</nav>
	);
};

export default FormFooterNav;
