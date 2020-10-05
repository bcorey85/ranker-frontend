import React from 'react';

import Accordion from '../../Accordion/Accordion';
import AccordionBody from '../../Accordion/AccordionBody';
import AccordionHeader from '../../Accordion/AccordionHeader';

import './FormSetup.scss';

const FormSetupAdvancedOptions = ({
	sort,
	handleSort,
	handleWeightedAverages,
	showWeightedAverage
}) => {
	return (
		<Accordion>
			<AccordionHeader>
				<h3>Advanced Options</h3>
			</AccordionHeader>
			<AccordionBody>
				<h4>Sort Results</h4>
				<div className='form-setup__options'>
					<div onClick={handleSort}>
						<label htmlFor='desc'>High to Low</label>
						<input
							type='radio'
							id='desc'
							name='sort'
							value='desc'
							defaultChecked={sort === 'desc'}
						/>
					</div>
					<div onClick={handleSort}>
						<label htmlFor='asc'>Low to High</label>
						<input
							type='radio'
							id='asc'
							name='sort'
							value='asc'
							defaultChecked={sort === 'asc'}
						/>
					</div>
				</div>

				<h4>Weighted Averages</h4>

				<div className='form-setup__options'>
					<div onClick={handleWeightedAverages}>
						<label htmlFor='weighted-avg-off'>Off</label>
						<input
							type='radio'
							id='weighted-avg-off'
							name='weighted-avg'
							value={false}
							defaultChecked={showWeightedAverage === false}
						/>
					</div>
					<div onClick={handleWeightedAverages}>
						<label htmlFor='weighted-avg-on'>On</label>
						<input
							type='radio'
							id='weighted-avg-on'
							name='weighted-avg'
							value={true}
							defaultChecked={showWeightedAverage === true}
						/>
					</div>
				</div>
			</AccordionBody>
		</Accordion>
	);
};

export default FormSetupAdvancedOptions;
