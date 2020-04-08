import React from 'react';
import { NavLink } from 'react-router-dom';

import './Button.scss';
const Button = ({ handleClick, children, to }) => {
	if (to) {
		return (
			<NavLink className='btn' to={handleClick}>
				{children}
			</NavLink>
		);
	}

	return (
		<button className='btn' onClick={handleClick}>
			{children}
		</button>
	);
};

export default Button;
