import React from 'react';

import './ModalControls.scss';

const ModalControls = props => {
	return <div className='modal__controls'>{props.children}</div>;
};

export default ModalControls;
