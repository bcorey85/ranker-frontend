import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

import './MainNav.scss';

const MainNav = () => {
	const { isLoggedIn, userId } = useContext(AuthContext);

	return (
		<ul className='main-nav'>
			{isLoggedIn ? (
				<li>
					<NavLink to={`/users/${userId}`}>Profile</NavLink>
				</li>
			) : (
				<li>
					<NavLink to='/login'>Login</NavLink>
				</li>
			)}
		</ul>
	);
};

export default MainNav;
