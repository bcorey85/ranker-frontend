import { useState, useCallback } from 'react';

const useMessage = (description, type, duration) => {
	const [ message, setMessage ] = useState({ description, type });

	const clearMessage = useCallback(() => {
		setTimeout(() => {
			setMessage({ type: 'hidden', description: '' });
		}, duration);
	}, []);

	return [ message, setMessage, clearMessage ];
};

export default useMessage;
