import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import UserDashboard from './pages/UserDashboard';

const routes = (
	<Switch>
		<Route path='/' exact component={Index} />
		<Route path='/login' exact component={Login} />
		<Route path='/register' exact component={Register} />
		<Route path='/forgotpassword' exact component={ForgotPassword} />
		<Route path='/user/:userId' exact component={UserDashboard} />
	</Switch>
);

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Layout>{routes}</Layout>
			</BrowserRouter>
		</div>
	);
}

export default App;
