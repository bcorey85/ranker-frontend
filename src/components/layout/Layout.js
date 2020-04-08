import React from 'react';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

import './Layout.scss';

const Layout = props => {
	return (
		<div className='layout'>
			<Header />
			<Content>{props.children}</Content>
			<Footer />
		</div>
	);
};

export default Layout;
