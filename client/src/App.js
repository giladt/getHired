import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { GoogleApiWrapper } from 'google-maps-react';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import Main from './components/main.js';
import './App.css';

// Apollo Client Setup
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
  cache,
  link
});

function App(props) {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Main google={props.google} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default GoogleApiWrapper(
  {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  }
)(App);
