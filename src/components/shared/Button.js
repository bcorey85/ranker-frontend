import React from 'react';
import { NavLink } from 'react-router-dom';

import './Button.scss';
const Button = ({ handleClick, children, to, link, disabled, type }) => {
	if (to) {
		return (
			<NavLink
				className={link ? 'link' : `btn btn--${type || 'primary'}`}
				to={handleClick}>
				{children}
			</NavLink>
		);
	}

	return (
		<button
			className={link ? 'link' : `btn btn--${type || 'primary'}`}
			onClick={handleClick}
			disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;
