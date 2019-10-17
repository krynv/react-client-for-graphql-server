import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { InMemoryCache } from 'apollo-cache-inmemory';

import './index.css';

import App from './components/App';

import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();

const client = new ApolloClient({
    uri: 'http://graphql.flix.industries/graphql', // http://localhost:8000/graphql
    cache,
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);

serviceWorker.unregister();
