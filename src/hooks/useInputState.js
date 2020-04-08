import { useState } from 'react';

const useInputState = initialState => {
	const [ state, setState ] = useState(initialState || '');

	const updateState = e => {
		setState(e.target.value);
	};

	const reset = () => {
		setState('');
	};
	return [ state, updateState, reset ];
};

export default useInputState;
