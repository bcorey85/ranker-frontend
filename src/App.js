import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

const routes = (
	<Switch>
		<Route path='/' exact component={Index} />
		<Route path='/login' exact component={Login} />
		<Route path='/register' exact component={Register} />
		<Route path='/resetpassword' exact component={ResetPassword} />
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
