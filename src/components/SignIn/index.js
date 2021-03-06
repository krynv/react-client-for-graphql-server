import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { RegisterLink } from '../Register';
import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';

const SIGN_IN = gql`
    mutation($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
            token
        }
    }
`;

const SignInPage = ({ history, refetch }) => (
    <div>
        <h1>Sign In</h1>

        <SignInForm history={history} refetch={refetch} />
        <RegisterLink />
    </div>
);

const INITIAL_STATE = {
    login: '',
    password: '',
};

class SignInForm extends React.Component {
    state = { ...INITIAL_STATE };

    onChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    onSubmit = (event, signIn) => {
        signIn().then(async ({ data }) => {
            this.setState({ ...INITIAL_STATE });

            localStorage.setItem('token', data.signIn.token);

            await this.props.refetch();

            this.props.history.push(routes.HOME);
        });

        event.preventDefault();
    };

    render() {
        const { login, password } = this.state;

        const isInvalid = password === '' || login === '';

        return (
            <Mutation mutation={SIGN_IN} variables={{ login, password }}>
                {(signIn, { loading, error, data }) => (

                    <form onSubmit={event => this.onSubmit(event, signIn)}>

                        <input
                            name="login"
                            value={login}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Email or Username"
                        />

                        <input
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Password"
                        />

                        <button disabled={isInvalid || loading} type="submit">
                            Sign In
                        </button>

                        {error && <ErrorMessage error={error} />}
                    </form>
                )}
            </Mutation>
        );
    }
}

export default withRouter(SignInPage);

export { SignInForm };