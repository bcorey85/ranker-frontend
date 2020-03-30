import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';

const Header = () => {
	return (
		<header className='header'>
			<div className='header__logo'>
				<FontAwesomeIcon icon={faSortUp} />
				<FontAwesomeIcon icon={faSortDown} />
				Ranker
			</div>
		</header>
	);
};

export default Header;
