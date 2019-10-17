import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../../Error';

const CREATE_MESSAGE = gql`
    mutation($text: String!) {
        createMessage(text: $text) {
            id
            text
            createdAt
            user {
            id
            username
            }
        }
    }
`;

class MessageCreate extends React.Component {
    state = {
        text: '',
    };

    onChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    onSubmit = async (event, createMessage) => {
        event.preventDefault();

        try {
            await createMessage();
            this.setState({ text: '' });

        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const { text } = this.state;

        return (
            <Mutation mutation={CREATE_MESSAGE} variables={{ text }} >
                {(createMessage, { loading, error, data }) => (
                    <form onSubmit={event => this.onSubmit(event, createMessage)}>

                        <textarea
                            name="text"
                            value={text}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Your message ..."
                        />
                        <button type="submit">Send</button>

                        {error && <ErrorMessage error={error} />}
                    </form>
                )}
            </Mutation>
        );
    }
}

export default MessageCreate;