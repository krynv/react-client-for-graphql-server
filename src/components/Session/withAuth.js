import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import * as routes from '../../constants/routes';
import { GET_ME } from './queries';

const withAuth = condition => Component => props => (
    <Query query={GET_ME}>
        {({ data, networkStatus }) => {
            if (networkStatus < 7) {
                return null;
            }

            return condition(data) ? (<Component {...props} />) : (
                <Redirect to={routes.SIGN_IN} />
            );
        }}
    </Query>
);

export default withAuth;