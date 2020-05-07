import React from 'react';

import './Footer.scss';
import bclogo from '../../imgs/bc-logo.svg';

const Footer = () => {
	return (
		<footer className='footer'>
			<a href='mailto: bcorey85@gmail.com'>
				<img
					src={bclogo}
					className='bc-logo'
					alt='Brandon Corey Web Development'
				/>
			</a>
			<div>© Copyright {new Date().getFullYear()}</div>
		</footer>
	);
};

export default Footer;
