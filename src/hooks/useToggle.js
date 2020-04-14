import { useState } from 'react';

const useToggle = initialState => {
	const [ state, setState ] = useState(initialState || '');

	const toggleState = e => {
		setState(!state);
	};

	return [ state, toggleState ];
};

export default useToggle;
