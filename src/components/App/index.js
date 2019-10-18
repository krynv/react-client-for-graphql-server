import React from 'react';
import { Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import HomePage from '../Home';
import RegisterPage from '../Register';
import SignInPage from '../SignIn';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import withSession from '../Session/withSession';

import * as routes from '../../constants/routes';
import history from '../../constants/history';

const App = ({ session, refetch }) => (
	<Router history={history}>
		<div>
			<Navigation session={session} />

			<hr />

			<Route exact path={routes.HOME} component={() => <HomePage />} />
			<Route exact path={routes.REGISTER} component={() => <RegisterPage refetch={refetch} />} />
			<Route exact path={routes.SIGN_IN} component={() => <SignInPage refetch={refetch} />} />
			<Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
			<Route exact path={routes.ADMIN} component={() => <AdminPage />} />
		</div>
	</Router>
);

export default withSession(App);