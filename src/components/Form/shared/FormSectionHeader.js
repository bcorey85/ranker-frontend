import React from 'react';

import './FormSectionHeader.scss';

const FormSectionHeader = ({ children }) => {
	return <h3 className='form-section-header'>{children}</h3>;
};

export default FormSectionHeader;
