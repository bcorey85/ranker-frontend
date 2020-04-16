import React from 'react';

import './Category.scss';
const Category = props => {
	return (
		<div className='category'>
			<h3>{props.title}</h3>
			{props.children}
		</div>
	);
};

export default Category;
