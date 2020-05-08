import React from 'react';

import Form from '../components/Form/Form';

const FormPage = props => {
	let formData;

	if (props.location.state && props.location.state.formData) {
		formData = props.location.state.formData;
	}

	return <Form formData={formData} />;
};

export default FormPage;
