import React from 'react';
import { NavLink } from 'react-router-dom';

import './Button.scss';
const Button = ({ handleClick, children, to, link }) => {
	if (to) {
		return (
			<NavLink className={link ? 'link' : 'btn'} to={handleClick}>
				{children}
			</NavLink>
		);
	}

	return (
		<button className={link ? 'link' : 'btn'} onClick={handleClick}>
			{children}
		</button>
	);
};

export default Button;
