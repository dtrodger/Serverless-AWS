import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './index.css';
import config from './config';
import App from './App';
import * as serviceWorker from './serviceWorker';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.AWS.COGNITO.REGION,
    userPoolId: config.AWS.COGNITO.USER_POOL_ID,
    identityPoolId: config.AWS.COGNITO.IDENTITY_POOL_ID,
    userPoolWebClientId: config.AWS.COGNITO.APP_CLIENT_ID
  },
  Storage: {
    region: config.AWS.S3.REGION,
    bucket: config.AWS.S3.BUCKET,
    identityPoolId: config.AWS.COGNITO.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: config.AWS.API_GATEWAY.NAME,
        endpoint: config.AWS.API_GATEWAY.URI,
        region: config.AWS.API_GATEWAY.REGION
      },
    ]
  }
});
const apolloClient = new ApolloClient({
  uri: config.APOLLO.URI,
  headers: config.APOLLO.HEADERS
});
ReactDOM.render(
    <ApolloProvider client={apolloClient}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();
