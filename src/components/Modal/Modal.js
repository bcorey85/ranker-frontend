import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './Modal.scss';
const Modal = ({ toggleModal, isOpen, children }) => {
	if (!isOpen) {
		return <div />;
	}

	return (
		<div className='modal'>
			<div className='modal__container'>
				<div className='modal__close'>
					<div onClick={toggleModal}>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
