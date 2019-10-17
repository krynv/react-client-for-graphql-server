import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../Error';

const GET_USERS_WITH_MESSAGES = gql`
{
    users {
        id
        username
        email
        messages {
            id
            text
            createdAt
        }
    }
}
`;

const Home = () => (
    <Query query={GET_USERS_WITH_MESSAGES}>
        {({ loading, error, data }) => {

            if (loading) return "Loading...";
            if (error) return <ErrorMessage error={error} />;

            return (
                <div>
                    {data.users.map(user => (
                        <div key={user.id}>
                            <h2>{user.username}</h2>
                            <div>
                                {user.messages.map(message => (
                                    <div key={message.id}>{message.text}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }}
    </Query>
);

export default Home;