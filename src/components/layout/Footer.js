import React from 'react';

import './Footer.scss';

const Footer = () => {
	return (
		<footer className='footer'>
			<a href='mailto: bcorey85@gmail.com'>
				{' '}
				© Copyright {new Date().getFullYear()} Brandon Corey
			</a>
		</footer>
	);
};

export default Footer;
