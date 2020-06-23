import React from 'react'
import {useLocation} from 'react-router-dom'
import {
  Route,
  Switch,
  useRouteMatch
} from "react-router-dom";

import Container from 'react-bootstrap/Container'
import NavBar from './NavBar/nav_bar';

import AdminLogin from './Login/login';

function AdminRoot(params:any) {
  const { path, url } = useRouteMatch();
  const location = useLocation();

  const links = [
    {name: 'Login', url: '/admin/login'},
    {name: 'Signup', url: '/admin/signup'},
  ]
  console.log(location);
  console.log(path);
  console.log(url);

  return (
    <div>
      <NavBar links={links} />
      <Container fluid='lg' className="justify-content-md-center">
        <Switch>
          <Route exact path={`${path}`}>
            <h1>Admin Root</h1>
            <h1>Location: {location.pathname}</h1>
          </Route>
          <Route exact path={`${path}/login`}>
            <AdminLogin />
          </Route> 
        </Switch>
      </Container>
    </div>
  );
}

export default AdminRoot;