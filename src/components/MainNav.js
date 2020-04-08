import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNav = () => {
	return (
		<div className='main-nav'>
			<NavLink to='/login'>Login</NavLink>
		</div>
	);
};

export default MainNav;
