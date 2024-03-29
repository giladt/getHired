import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { GoogleApiWrapper } from 'google-maps-react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

import Main from './components/main';
import styles from './App.module.css';

const dev_link = new HttpLink({uri: `http://localhost:4000/api`});
const prod_link = new HttpLink({uri: `${process.env.REACT_APP_PUBLIC_URL}/api`});

// Apollo Client Setup
const cache = new InMemoryCache();
const link = (process.env.NODE_ENV === 'development')?dev_link:prod_link;
const client = new ApolloClient({
  cache,
  link
});

function App(props:any) {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Main className={styles.main} google={props.google} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default GoogleApiWrapper(() => {
  const key:any = process.env.REACT_APP_GOOGLE_API_KEY;
  return {apiKey: key}
})(App);
