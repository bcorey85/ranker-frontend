import React from 'react';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

import './Layout.scss';

const Layout = () => {
	return (
		<div className='layout'>
			<Header />
			<Content />
			<Footer />
		</div>
	);
};

export default Layout;
