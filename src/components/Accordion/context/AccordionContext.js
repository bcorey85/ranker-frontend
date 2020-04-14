import React, { useState } from 'react';

export const AccordionContext = React.createContext({
	isOpen: null,
	handleOpen: () => {}
});

export const AccordionProvider = props => {
	const [ isOpen, setIsOpen ] = useState(false);
	const handleOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<AccordionContext.Provider value={{ isOpen, handleOpen }}>
			{props.children}
		</AccordionContext.Provider>
	);
};
