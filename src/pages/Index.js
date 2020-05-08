import React from 'react';

import Landing from '../components/Landing/Landing';
import useLocalStorage from '../hooks/useLocalStorage';

const Index = props => {
	const { getLocalStorage, clearLocalStorage } = useLocalStorage(
		'RankerAppForm'
	);

	const existingForm = getLocalStorage();

	return (
		<React.Fragment>
			<Landing
				existingForm={existingForm}
				clearLocalStorage={clearLocalStorage}
			/>
		</React.Fragment>
	);
};

export default Index;
