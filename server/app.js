const express = require('express');
const path = require('path');

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

var app = express();
var environment = app.get('env');

app.set('view engine', 'react');

if(environment === 'development'){
  console.log('Starting development server using cors.');
  var cors = require('cors');
  app.use(cors());
}

app.use('/api', graphqlHTTP({
  schema,
  graphiql: true
}));

if (environment === 'production') {
  
  app.use(express.static(path.join(__dirname, '/..client/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
  });
  
  app.use(express.static(path.join(__dirname, '/../admin/build')));
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname+'/../admin/build/index.html'));
  });

  // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
  });
}

module.exports = app;
