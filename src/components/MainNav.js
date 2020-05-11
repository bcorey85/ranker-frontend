import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import AuthContext from '../contexts/AuthContext';

import './MainNav.scss';

const MainNav = () => {
	const { isLoggedIn, userId } = useContext(AuthContext);

	return (
		<ul className='main-nav'>
			<li>
				<NavLink to='/'>
					<FontAwesomeIcon icon={faHome} />
				</NavLink>
			</li>
			{isLoggedIn ? (
				<li>
					<NavLink to={`/users/${userId}`}>
						<FontAwesomeIcon icon={faUser} />
					</NavLink>
				</li>
			) : (
				<li>
					<NavLink to='/login'>
						<FontAwesomeIcon icon={faSignInAlt} />
					</NavLink>
				</li>
			)}
		</ul>
	);
};

export default MainNav;
