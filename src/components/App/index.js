import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import HomePage from '../Home';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import AccountPage from '../Account';

import * as routes from '../../constants/routes';

const App = () => (
	<Router>
		<div>
			<Navigation />

			<hr />

			<Route exact path={routes.HOME} component={() => <HomePage />} />
			<Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
			<Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
			<Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />

		</div>
	</Router>
);

export default App;