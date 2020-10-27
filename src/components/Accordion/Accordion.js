import React from 'react';
import { AccordionProvider } from './context/AccordionContext';

import './Accordion.scss';

const Accordion = props => {
	return (
		<AccordionProvider>
			<section className='accordion' tabIndex='0'>
				{props.children}
			</section>
		</AccordionProvider>
	);
};

export default Accordion;
