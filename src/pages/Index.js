import React from 'react';

import Form from '../components/Form/Form';
const Index = props => {
	let formData;
	if (props.location.state && props.location.state.formData) {
		formData = props.location.state.formData;
	}

	return (
		<React.Fragment>
			<Form formData={formData} />
		</React.Fragment>
	);
};

export default Index;
