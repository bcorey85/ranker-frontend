import React, { useState, useEffect, useContext } from 'react';

import FormSection from './FormSection';
import Input from '../shared/Input';
import FormSectionHeader from './FormSectionHeader';
import FormErrorBoundary from './FormErrorBoundary';
import FormAverage from './FormAverage';

import { mapScores, updateItemScore } from '../../reducers/form/formActions';
import { FormContext } from '../../contexts/FormContext';
import useScrollToTop from '../../hooks/useScrollToTop';

import './FormScore.scss';

const FormInput = () => {
	useScrollToTop();

	const [ isLoading, setIsLoading ] = useState(true);
	const { dispatch, formState } = useContext(FormContext);

	useEffect(
		() => {
			dispatch(mapScores());
			setIsLoading(false);
		},
		[ dispatch ]
	);

	const handleUpdateScore = e => {
		const value = e.target.value;
		const scoreId = e.target.dataset.scoreindex;
		const itemId = e.target.dataset.itemindex;

		dispatch(updateItemScore(value, scoreId, itemId));
	};

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
									value={score.score || ''}
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
				<FormAverage
					average={item.average}
					weightedAverage={item.weightedAverage}
					showWeighted={formState.form.options.weightedAverage}
				/>
			</div>
		);
	});

	return (
		<div className='form-score'>
			<FormErrorBoundary formState={formState}>
				<h1>Scores</h1>
				{isLoading ? 'Loading...' : scores}
			</FormErrorBoundary>
		</div>
	);
};

export default FormInput;
