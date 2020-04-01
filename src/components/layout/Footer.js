import React from 'react';

import './Footer.scss';

const Footer = () => {
	return (
		<footer className='footer'>
			<div>© Copyright {new Date().getFullYear()}</div>
			<a href='mailto: bcorey85@gmail.com'>Brandon Corey</a>
		</footer>
	);
};

export default Footer;
