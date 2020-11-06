import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
// import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks'
import {
    ApolloClient,
    InMemoryCache
  } from '@apollo/client'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri:'http://192.168.1.129:4000/graphql'
});

ReactDOM.render(
    <ApolloProvider  client={client}>
        <App />
    </ ApolloProvider>, document.getElementById('root'))