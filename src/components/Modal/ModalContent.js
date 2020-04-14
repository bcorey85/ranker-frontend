import React from 'react';

import './ModalContent.scss';

const ModalContent = props => {
	return <div className='modal__content'>{props.children}</div>;
};

export default ModalContent;
