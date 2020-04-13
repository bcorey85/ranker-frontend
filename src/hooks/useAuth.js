import { useState, useEffect, useCallback } from 'react';

let logoutTimer;
const useAuth = () => {
	const [ token, setToken ] = useState(null);
	const [ userId, setUserId ] = useState(null);
	const [ tokenExpiration, setTokenExpiration ] = useState(null);

	const login = useCallback((id, token, expirationDate) => {
		setUserId(id);
		setToken(token);

		const timer = new Date(new Date().getTime() + 1000 * 60 * 120);
		const tokenExpirationTime = expirationDate || timer;
		setTokenExpiration(tokenExpirationTime);

		localStorage.setItem(
			'RankerAppUser',
			JSON.stringify({
				id,
				token,
				expiration: tokenExpirationTime.toISOString()
			})
		);
	}, []);

	const logout = useCallback(() => {
		setUserId(null);
		setToken(null);

		localStorage.removeItem('RankerAppUser');
	}, []);

	// Auto Login from Local Storage on page refresh
	useEffect(
		() => {
			const userData = JSON.parse(localStorage.getItem('RankerAppUser'));

			if (userData) {
				const tokenExpired = new Date(userData.expiration) < new Date();
				const loginCheck = userData.token && !tokenExpired;

				if (loginCheck) {
					login(
						userData.id,
						userData.token,
						new Date(userData.expiration)
					);
				}
			}
		},
		[ login ]
	);

	// Auto logout from token expiration timer
	useEffect(
		() => {
			if (token && tokenExpiration) {
				const timeRemaining =
					tokenExpiration.getTime() - new Date().getTime();

				logoutTimer = setTimeout(logout, timeRemaining);
			} else {
				clearTimeout(logoutTimer);
			}
		},
		[ token, logout, tokenExpiration ]
	);

	return { userId, token, login, logout };
};

export default useAuth;
