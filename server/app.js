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

//################# demo start #################

const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const questions = [
  {
    id: 1,
    title: "How do I make a sandwich?",
    description: "I am trying very hard, but I do not know how to make a delicious sandwich. Can someone help me?",
    answers: []
  },
  {
    id: 2,
    title: "What is React?",
    description: "I have been hearing a lot about React. What is it?",
    answers: [{
      id: 1,
      answer: "Just spread butter on the bread, and that is it."
    }]
  }
];

app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/questions', (req, res) => {
  const qs = questions.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    answers: q.answers.length,
  }));
  res.send(qs);
});

app.get('/questions/:id', (req,res) => {
  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();
  res.send(question[0]);
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-obv5pkaa.eu.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'E0Wxg0eXuFePRIWmQypZqO7Q42CN51PZ',
  issuer: `https://dev-obv5pkaa.eu.auth0.com/`,
  algorithms: ['RS256']
});



app.post('/questions', checkJwt, (req, res) => {
  const {title, description} = req.body;
  const newQuestion = {
    id: questions.length + 1,
    title,
    description,
    answers: [],
    author: req.user.name
  };
  questions.push(newQuestion);
  res.status(200).send();
});

// insert a new answer to a question
app.post('/questions/answer/:id', checkJwt, (req, res) => {
  const {answer} = req.body;

  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();

  question[0].answers.push({
    answer,
    author: req.user.name
  });

  res.status(200).send();
});

// ################# demo end #################

app.use(
  '/api', 
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

if (environment === 'production') {
  
  app.use(express.static(path.join(__dirname, '/..client/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
  });
  
  app.use(express.static(path.join(__dirname, '/../admin/build')));
  app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname+'/../admin/build/index.html'));
  });

  // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
  });
}

module.exports = app;
