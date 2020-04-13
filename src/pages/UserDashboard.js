import React, { useState, useEffect, useContext } from 'react';

import AuthContext from '../contexts/AuthContext';

const UserDashboard = props => {
	const { logout } = useContext(AuthContext);

	const handleLogout = () => {
		logout();
		props.history.push('/');
	};

	return (
		<div>
			user dashboard
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default UserDashboard;
