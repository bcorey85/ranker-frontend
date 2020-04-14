import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { AccordionContext } from './context/AccordionContext';
import './AccordionHeader.scss';

const AccordionHeader = ({ children }) => {
	const { isOpen, handleOpen } = useContext(AccordionContext);

	return (
		<div className='accordion__header' onClick={handleOpen}>
			{children}
			<FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
		</div>
	);
};

export default AccordionHeader;
