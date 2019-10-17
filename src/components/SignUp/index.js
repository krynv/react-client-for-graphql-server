import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';

const SIGN_UP = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        signUp(username: $username, email: $email, password: $password) {
            token
        }
    }
`;

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpPage = ({ history, refetch }) => (
    <div>
        <h1>Sign Up</h1>

        <SignUpForm history={history} refetch={refetch} />
    </div>
);

class SignUpForm extends React.Component {
    state = { ...INITIAL_STATE };

    onChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    onSubmit = (event, signUp) => {
        signUp().then(async ({ data }) => {
            this.setState({ ...INITIAL_STATE });

            localStorage.setItem('token', data.signUp.token);

            await this.props.refetch;

            this.props.history.push(routes.HOME);
        });

        event.preventDefault();
    };

    render() {

        const {
            username,
            email,
            password,
            confirmPassword,
        } = this.state;

        const isInvalid =
            password !== confirmPassword ||
            password === '' ||
            email === '' ||
            username === ''; // check if we have a valid form on submission

        return (
            <Mutation mutation={SIGN_UP} variables={{ username, email, password }}>
                {(signUp, { loading, error, data }) => (

                    <form onSubmit={event => this.onSubmit(event, signUp)}>

                        <input
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Full Name"
                        />

                        <input
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Email Address"
                        />

                        <input
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Password"
                        />

                        <input
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Confirm Password"
                        />

                        <button disabled={isInvalid || loading} type="submit"> {/*Disable the form if we the form is invalid OR if it's loading*/}
                            Sign Up
                        </button>

                        {error && <ErrorMessage error={error} />} {/*Show an error if we have an error*/}
                    </form>
                )}
            </Mutation>
        );
    }
}

const SignUpLink = () => <p>Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link></p>;

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };