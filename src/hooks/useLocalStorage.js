import { useState, useCallback } from 'react';

const useLocalStorage = init => {
	const [ identifier ] = useState(init);

	const setLocalStorage = useCallback(
		payload => {
			localStorage.setItem(identifier, JSON.stringify(payload));
		},
		[ identifier ]
	);

	const getLocalStorage = useCallback(
		() => {
			const form = JSON.parse(localStorage.getItem(identifier));
			return form;
		},
		[ identifier ]
	);

	const clearLocalStorage = useCallback(
		() => {
			localStorage.removeItem(identifier);
		},
		[ identifier ]
	);

	return { setLocalStorage, getLocalStorage, clearLocalStorage };
};

export default useLocalStorage;
