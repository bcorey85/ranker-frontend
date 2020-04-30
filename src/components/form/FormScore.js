import React, { useState, useEffect, useContext } from 'react';

import FormSection from './FormSection';
import Input from '../shared/Input';
import FormSectionHeader from './FormSectionHeader';

import { FormContext } from '../../contexts/FormContext';
import useScrollToTop from '../../hooks/useScrollToTop';

import './FormScore.scss';

const FormInput = () => {
	useScrollToTop();

	const [ isLoading, setIsLoading ] = useState(true);
	const { dispatch, formState } = useContext(FormContext);

	useEffect(
		() => {
			dispatch({ type: 'MAP_SCORES' });
			setIsLoading(false);
		},
		[ dispatch ]
	);

	const handleUpdateScore = e => {
		dispatch({
			type: 'UPDATE_ITEM_SCORE',
			value: e.target.value,
			scoreId: e.target.dataset.scoreindex,
			itemId: e.target.dataset.itemindex
		});
	};

	if (formState.form.items.every(item => item.label === '')) {
		return (
			<div className='form-score'>
				Please enter at least one Item to rank in Setup.
			</div>
		);
	}

	if (formState.form.scoreLabels.every(label => label.label === '')) {
		return (
			<div className='form-score'>
				Please enter at least one Score Label in Setup.
			</div>
		);
	}

	const scores = formState.form.items.map((item, itemIndex) => {
		return (
			<div key={item.id}>
				<FormSectionHeader>{item.label}</FormSectionHeader>
				<FormSection>
					{item.scores.map((score, scoreIndex) => {
						return (
							<React.Fragment
								key={`item${itemIndex + 1}-${score.id}`}>
								<Input
									type='number'
									id={`item${itemIndex + 1}-${score.id}`}
									value={score.score}
									handleChange={handleUpdateScore}
									data-itemindex={item.id}
									data-scoreindex={score.id}
									placeholder={null}
									label={score.label}
									errorText='Please enter a value'
								/>
							</React.Fragment>
						);
					})}
				</FormSection>
				<div className='form-score__average'>
					<h2>
						<span>Average: </span>
						{Math.round(item.average * 100) / 100}
					</h2>
				</div>
			</div>
		);
	});

	return (
		<div className='form-score'>
			<h1>Scores</h1>
			{isLoading ? 'Loading...' : scores}
		</div>
	);
};

export default FormInput;
