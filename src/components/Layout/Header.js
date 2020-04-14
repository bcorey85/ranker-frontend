import React from 'react';
import { NavLink } from 'react-router-dom';

import MainNav from '../MainNav';

import logo from '../../imgs/logo.svg';
import './Header.scss';

const Header = () => {
	return (
		<header className='header'>
			<NavLink to='/'>
				<img src={logo} alt='ranker logo' />
			</NavLink>
			<MainNav />
		</header>
	);
};

export default Header;
