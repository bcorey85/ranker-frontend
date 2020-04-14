import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Button from '../components/shared/Button';
import Accordion from '../components/Accordion/Accordion';
import AccordionHeader from '../components/Accordion/AccordionHeader';
import AccordionBody from '../components/Accordion/AccordionBody';

import AuthContext from '../contexts/AuthContext';
import './UserDashboard.scss';

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
		<div className='user-dashboard'>
			<section className='user-dashboard__user-info'>
				<h2>User Info</h2>
				<div>
					<strong>Username:</strong> {userData.username}
				</div>
				<div>
					<strong>Email:</strong> {userData.email}
				</div>
				<NavLink to='#'>Edit User Details</NavLink>
			</section>
			<section className='user-dashboard__past-rankings'>
				<h2>Past Rankings</h2>
				{userData.rankForms.map(form => {
					return <div key={form._id}>{form._id}</div>;
				})}
				<h3>Whiskey</h3>
				<Accordion>
					<AccordionHeader>8/5/2019 - Irish Whiskey</AccordionHeader>
					<AccordionBody>
						These transition properties allow elements to change
						values over a specified duration, animating the property
						changes, rather than having them occur immediately. Here
						is a simple example that transitions the background
						color of a element on hover
					</AccordionBody>
				</Accordion>
				<Accordion>
					<AccordionHeader>8/5/2019 - Irish Whiskey</AccordionHeader>
					<AccordionBody>
						These transition properties allow elements to change
						values over a specified duration, animating the property
						changes, rather than having them occur immediately. Here
						is a simple example that transitions the background
						color of a element on hover
					</AccordionBody>
				</Accordion>
				<Accordion>
					<AccordionHeader>8/5/2019 - Irish Whiskey</AccordionHeader>
					<AccordionBody>
						These transition properties allow elements to change
						values over a specified duration, animating the property
						changes, rather than having them occur immediately. Here
						is a simple example that transitions the background
						color of a element on hover
					</AccordionBody>
				</Accordion>
				<h3>Whiskey</h3>
				<Accordion>
					<AccordionHeader>8/5/2019 - Irish Whiskey</AccordionHeader>
					<AccordionBody>
						These transition properties allow elements to change
						values over a specified duration, animating the property
						changes, rather than having them occur immediately. Here
						is a simple example that transitions the background
						color of a element on hover
					</AccordionBody>
				</Accordion>
				<Accordion>
					<AccordionHeader>8/5/2019 - Irish Whiskey</AccordionHeader>
					<AccordionBody>
						These transition properties allow elements to change
						values over a specified duration, animating the property
						changes, rather than having them occur immediately. Here
						is a simple example that transitions the background
						color of a element on hover
					</AccordionBody>
				</Accordion>
				<Accordion>
					<AccordionHeader>8/5/2019 - Irish Whiskey</AccordionHeader>
					<AccordionBody>
						These transition properties allow elements to change
						values over a specified duration, animating the property
						changes, rather than having them occur immediately. Here
						is a simple example that transitions the background
						color of a element on hover
					</AccordionBody>
				</Accordion>
			</section>

			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
};

export default UserDashboard;
