import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';

import Button from '../components/shared/Button';
import Accordion from '../components/Accordion/Accordion';
import AccordionHeader from '../components/Accordion/AccordionHeader';
import AccordionBody from '../components/Accordion/AccordionBody';
import EditUserDetails from '../components/UserDashboard/EditUserDetails';
import FormDelete from '../components/Form/FormDelete';
import FormResultsTable from '../components/Form/FormResultsTable';
import Category from '../components/UserDashboard/Category';
import DeleteButton from '../components/shared/DeleteBtn';
import EditButton from '../components/shared/EditBtn';
import Modal from '../components/Modal/Modal';
import ModalContent from '../components/Modal/ModalContent';
import ModalControls from '../components/Modal/ModalControls';
import Panel from '../components/shared/Panel';

import HttpRequest from '../utils/httpRequest';
import useToggle from '../hooks/useToggle';
import AuthContext from '../contexts/AuthContext';
import formatDate from '../utils/formateDate';
import './UserDashboard.scss';

const UserDashboard = props => {
	const { logout, userId, token } = useContext(AuthContext);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ userData, setUserData ] = useState({});
	const [ categories, setCategories ] = useState({});
	const [ editDetailsMode, setEditDetailsMode ] = useToggle(false);
	const [ deleteModalOpen, setDeleteModalOpen ] = useToggle(false);
	const [ deleteFormId, setDeleteFormId ] = useState('');

	const getUserProfile = useCallback(
		async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/${userId}`
				);
				setUserData(response.data.payload.user);
				setCategories(response.data.payload.categories);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		},
		[ userId ]
	);

	useEffect(
		() => {
			getUserProfile();
		},
		[ getUserProfile ]
	);

	const handleLogout = () => {
		logout();
		props.history.push('/');
	};

	const handleDelete = async id => {
		setDeleteModalOpen(true);
		setDeleteFormId(id);
	};

	const deleteForm = async id => {
		try {
			await HttpRequest({
				method: 'delete',
				url: `${process.env.REACT_APP_API_URL}/rank/${id}`,
				token
			});
			setDeleteModalOpen(false);
			getUserProfile();
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = form => {
		props.history.push({
			pathname: '/form',
			state: {
				formData: form
			}
		});
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
			<Panel>
				<div className='user-dashboard__controls'>
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
					{[ ...categories ].sort().map(category => {
						const forms = userData.rankForms.map(form => {
							if (form.category === category) {
								return (
									<Accordion key={form._id}>
										<AccordionHeader>
											{formatDate(form.date)} -{' '}
											{form.title}
										</AccordionHeader>
										<AccordionBody>
											<div className='past-ranking-controls'>
												<DeleteButton
													handleClick={e =>
														handleDelete(form._id)}
												/>
												<EditButton
													handleClick={() =>
														handleEdit(form)}
												/>
											</div>
											<FormResultsTable formData={form} />
										</AccordionBody>
									</Accordion>
								);
							}
							return null;
						});
						return (
							<Category title={category} key={category}>
								{forms}
							</Category>
						);
					})}
				</section>

				<Modal
					toggleModal={setDeleteModalOpen}
					isOpen={deleteModalOpen}>
					<ModalContent>
						<FormDelete />
						<ModalControls>
							<Button handleClick={setDeleteModalOpen}>
								Cancel
							</Button>
							<Button
								handleClick={() => deleteForm(deleteFormId)}>
								Delete
							</Button>
						</ModalControls>
					</ModalContent>
				</Modal>
			</Panel>
		</div>
	);
};

export default UserDashboard;
