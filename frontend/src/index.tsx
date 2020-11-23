import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
// import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks'
import {
    ApolloClient,
    InMemoryCache
  } from '@apollo/client'
const domain = "192.168.1.129"
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri:`http://${domain}:4000/graphql`
});

ReactDOM.render(
    <ApolloProvider  client={client}>
        <App />
    </ ApolloProvider>, document.getElementById('root'))