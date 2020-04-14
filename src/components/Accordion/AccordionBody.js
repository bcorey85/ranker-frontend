import React, { useContext } from 'react';

import { AccordionContext } from './context/AccordionContext';
import './AccordionBody.scss';

const AccordionBody = ({ children }) => {
	const { isOpen } = useContext(AccordionContext);
	return (
		<div className={isOpen ? 'accordion__body--open' : 'accordion__body'}>
			{children}
		</div>
	);
};

export default AccordionBody;
