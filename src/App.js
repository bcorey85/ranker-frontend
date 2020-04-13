import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import UserDashboard from './pages/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import AuthContext from './contexts/AuthContext';
import useAuth from './hooks/useAuth';

const routes = (
	<Switch>
		<Route path='/' exact component={Index} />
		<Route path='/login' exact component={Login} />
		<Route path='/register' exact component={Register} />
		<Route path='/forgotpassword' exact component={ForgotPassword} />
		<ProtectedRoute path='/user/:userId' exact component={UserDashboard} />
		<Redirect to='/' />
	</Switch>
);

function App() {
	const { userId, token, login, logout } = useAuth();

	return (
		<div className='App'>
			<AuthContext.Provider
				value={{
					isLoggedIn: !!token,
					token,
					userId,
					login,
					logout
				}}>
				<BrowserRouter>
					<Layout>{routes}</Layout>
				</BrowserRouter>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
