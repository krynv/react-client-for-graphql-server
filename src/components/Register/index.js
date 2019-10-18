import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';

const REGISTER = gql`
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

const RegisterPage = ({ history, refetch }) => (
    <div>
        <h1>Register</h1>

        <RegisterForm history={history} refetch={refetch} />
    </div>
);

class RegisterForm extends React.Component {
    state = { ...INITIAL_STATE };

    onChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    onSubmit = (event, register) => {
        register().then(async ({ data }) => {
            this.setState({ ...INITIAL_STATE });

            localStorage.setItem('token', data.register.token);

            await this.props.refetch();

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
            <Mutation mutation={REGISTER} variables={{ username, email, password }}>
                {(register, { loading, error, data }) => (

                    <form onSubmit={event => this.onSubmit(event, register)}>

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
                            Go!
                        </button>

                        {error && <ErrorMessage error={error} />} {/*Show an error if we have an error*/}
                    </form>
                )}
            </Mutation>
        );
    }
}

const RegisterLink = () => <p>Don't have an account? <Link to={routes.REGISTER}>Register here!</Link></p>;

export default withRouter(RegisterPage);

export { RegisterForm, RegisterLink };