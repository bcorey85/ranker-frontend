import React from 'react';

import './Panel.scss';

const Panel = props => {
	return <div className='panel'>{props.children}</div>;
};

export default Panel;
