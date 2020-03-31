import React from 'react';

import logo from '../../imgs/logo.svg';
import './Header.scss';

const Header = () => {
	return (
		<header className='header'>
			<img src={logo} alt='ranker logo' />
		</header>
	);
};

export default Header;
