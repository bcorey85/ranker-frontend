import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Button from '../components/shared/Button';

import AuthContext from '../contexts/AuthContext';

const UserDashboard = props => {
	const { logout, userId } = useContext(AuthContext);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ userData, setUserData ] = useState({});

	useEffect(
		() => {
			const getUserProfile = async () => {
				try {
					const response = await axios.get(
						`${process.env.REACT_APP_API_URL}/users/${userId}`
					);
					setUserData(response.data.payload);
					setIsLoading(false);
				} catch (error) {
					console.log(error);
				}
			};

			getUserProfile();
		},
		[ userId ]
	);

	const handleLogout = () => {
		logout();
		props.history.push('/');
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}
	console.log(userData);

	return (
		<div>
			<div>
				<h2>User Info</h2>
				<div>{userData.username}</div>
				<div>{userData.email}</div>
				<NavLink to='#'>Edit User Details</NavLink>
			</div>
			<div>
				<h2>Past Rankings</h2>
				{userData.rankForms.map(form => {
					return <div key={form._id}>{form._id}</div>;
				})}
			</div>

			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
};

export default UserDashboard;
