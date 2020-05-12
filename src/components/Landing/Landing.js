import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Modal from '../Modal/Modal';
import ModalContent from '../Modal/ModalContent';
import ModalControls from '../Modal/ModalControls';
import FormReset from '../Form/FormReset';
import Button from '../shared/Button';
import Panel from '../shared/Panel';
import DividerBlock from '../shared/DividerBlock';

import checkEmptyForm from '../../utils/checkEmptyForm';
import useToggle from '../../hooks/useToggle';
import useScrollToTop from '../../hooks/useScrollToTop';
import logo from '../../imgs/logo-blue.svg';
import './Landing.scss';

const Landing = ({ history, clearLocalStorage, existingForm }) => {
	useScrollToTop();
	const [ resetModalOpen, setResetModalOpen ] = useToggle(false);

	const handleReset = () => {
		setResetModalOpen(true);
	};

	const resetForm = () => {
		clearLocalStorage();
		setResetModalOpen(false);
		history.push('/form');
	};

	const handleNewForm = () => {
		history.push('/form');
	};

	const handleResumeForm = () => {
		history.push('/form', { state: existingForm });
	};

	let existingFormEmpty;
	if (existingForm) {
		existingFormEmpty = checkEmptyForm(existingForm.form).empty;
	}
	return (
		<div className='landing'>
			<Panel>
				<img src={logo} alt='Ranker App' />
				<h1>An Easier Way to Make Choices</h1>
				<p>
					Decision fatigue is real. Use the power of math to help
					simplify your options.
				</p>
				<DividerBlock />
				<div className='landing__controls'>
					<div>
						<Button
							handleClick={
								existingForm && !existingFormEmpty ? (
									handleReset
								) : (
									handleNewForm
								)
							}
							link>
							<FontAwesomeIcon icon={faPlus} /> New Form
						</Button>
					</div>
					<div>
						<Button
							handleClick={handleResumeForm}
							link
							disabled={
								!existingForm ||
								(existingForm && existingFormEmpty)
							}>
							Continue Form
						</Button>
					</div>
				</div>
			</Panel>
			<Modal toggleModal={setResetModalOpen} isOpen={resetModalOpen}>
				<ModalContent>
					<FormReset />
				</ModalContent>
				<ModalControls>
					<Button handleClick={() => setResetModalOpen(false)} link>
						Cancel
					</Button>
					<Button handleClick={resetForm} link>
						<FontAwesomeIcon icon={faPlus} /> New Form
					</Button>
				</ModalControls>
			</Modal>
		</div>
	);
};

export default withRouter(Landing);
