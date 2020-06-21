import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import AppDemo from './AppDemo';
import {Route} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Route exact path='/' component={App} />
    <Route path='/questions/' component={AppDemo} />
  </BrowserRouter>,
  document.getElementById('root')
);
