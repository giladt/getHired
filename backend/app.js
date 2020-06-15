const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
}

app.use(cors());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

module.exports = app;
