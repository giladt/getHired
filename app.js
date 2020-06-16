const express = require('express');
const path = require('path');

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

var app = express();
var environment = app.get('env');

app.set('view engine', 'react');

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: false
}));

if (environment === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
}

module.exports = app;
