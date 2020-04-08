import React from 'react';

import './Content.scss';

const Content = props => {
	return <main className='content'>{props.children}</main>;
};

export default Content;
