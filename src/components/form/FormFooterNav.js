import React, { useState, useEffect } from 'react';
import Button from '../shared/Button';

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
		</nav>
	);
};

export default FormFooterNav;
