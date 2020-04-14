import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './Modal.scss';
const Modal = props => {
	return (
		<div className='modal'>
			<div className='modal__container'>
				<div className='modal__close'>
					<div onClick={props.toggleModal}>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
				{props.children}
			</div>
		</div>
	);
};

export default Modal;
