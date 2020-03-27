import React from 'react';

import FormNav from './FormNav';
import FormFooterNav from './FormFooterNav';

import './Form.scss';

const Form = () => {
	return (
		<div className='form'>
			<FormNav />
			<h1>Setup</h1>
			<h2>Setup Style</h2>
			<div className='form__setup'>
				<label htmlFor='quick'>Quick</label>
				<input type='radio' id='quick' name='setup' value='quick' />
				<label htmlFor='Flexible'>Flexible</label>
				<input
					type='radio'
					id='flexible'
					name='setup'
					value='flexible'
				/>
			</div>
			<h2>What are you ranking?</h2>
			<div className='form__category'>
				<label htmlFor='category'>Category</label>
				<input type='text' id='category' placeholder='Category' />
			</div>
			<h2>What items are you ranking?</h2>
			<div className='form__section'>
				<label htmlFor='item1'>Item 1</label>
				<input type='text' id='item1' placeholder='Item1' />
				<label htmlFor='item2'>Item 2</label>
				<input type='text' id='item2' placeholder='Item1' />
				<div className='form__add-btn'>
					<button>Add New</button>
				</div>
			</div>

			<h2>What are you scoring by?</h2>
			<div className='form__section'>
				<label htmlFor='score1'>Score 1</label>
				<input type='text' id='score1' placeholder='Score 1' />
				<label htmlFor='score2'>Score 2</label>
				<input type='text' id='score2' placeholder='Score 2' />
				<div className='form__add-btn'>
					<button>Add New</button>
				</div>
			</div>
			<FormFooterNav />
		</div>
	);
};

export default Form;
