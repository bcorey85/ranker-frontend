import React from 'react';
import { NavLink } from 'react-router-dom';

import './Button.scss';
const Button = ({ handleClick, children, to, style }) => {
	if (to) {
		return (
			<NavLink
				className={style === 'link' ? 'link' : 'btn'}
				to={handleClick}>
				{children}
			</NavLink>
		);
	}

	return (
		<button
			className={style === 'link' ? 'link' : 'btn'}
			onClick={handleClick}>
			{children}
		</button>
	);
};

export default Button;
