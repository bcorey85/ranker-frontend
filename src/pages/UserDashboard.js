import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Button from '../components/shared/Button';
import Accordion from '../components/Accordion/Accordion';
import AccordionHeader from '../components/Accordion/AccordionHeader';
import AccordionBody from '../components/Accordion/AccordionBody';
import EditUserDetails from '../components/UserDashboard/EditUserDetails';
import FormResultsTable from '../components/Form/FormResultsTable';

import useToggle from '../hooks/useToggle';
import AuthContext from '../contexts/AuthContext';
import formatDate from '../utils/formateDate';
import './UserDashboard.scss';

const UserDashboard = props => {
	const { logout, userId } = useContext(AuthContext);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ userData, setUserData ] = useState({});
	const [ editDetailsMode, setEditDetailsMode ] = useToggle(false);

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
		[ userId, editDetailsMode ]
	);

	const handleLogout = () => {
		logout();
		props.history.push('/');
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (editDetailsMode) {
		return (
			<EditUserDetails
				userData={userData}
				history={props.history}
				setEditDetailsMode={setEditDetailsMode}
			/>
		);
	}

	return (
		<div className='user-dashboard'>
			<div className='user-dashboard__controls'>
				<div />
				<Button handleClick={handleLogout} link>
					Logout
				</Button>
			</div>
			<section className='user-dashboard__user-info'>
				<h2>User Info</h2>
				<div>
					<strong>Username:</strong> {userData.username}
				</div>
				<div>
					<strong>Email:</strong> {userData.email}
				</div>
				<Button handleClick={setEditDetailsMode} link>
					Edit Details
				</Button>
			</section>
			<section className='user-dashboard__past-rankings'>
				<h2>Past Rankings</h2>
				{userData.rankForms.map(form => {
					return (
						<Accordion>
							<AccordionHeader>
								{formatDate(form.date)} - {form.title}
							</AccordionHeader>
							<AccordionBody>
								<FormResultsTable formData={form} />
							</AccordionBody>
						</Accordion>
					);
				})}
			</section>
		</div>
	);
};

export default UserDashboard;
