import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Panel from '../shared/Panel';

import './Modal.scss';
const Modal = ({ toggleModal, isOpen, children }) => {
	if (!isOpen) {
		return <div />;
	}

	return (
		<div className='modal'>
			<div className='modal__container'>
				<Panel>
					<div className='modal__close'>
						<div onClick={toggleModal}>
							<FontAwesomeIcon icon={faTimes} />
						</div>
					</div>
					{children}
				</Panel>
			</div>
		</div>
	);
};

export default Modal;
