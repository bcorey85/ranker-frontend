import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const auth = useContext(AuthContext);
	const props = { ...rest };
	const user = props.computedMatch.params.userId;

	if (auth.isLoggedIn && auth.userId === user) {
		return <Route {...rest} render={props => <Component {...props} />} />;
	} else {
		return <Route render={() => <Redirect to='/' />} />;
	}
};

export default ProtectedRoute;
