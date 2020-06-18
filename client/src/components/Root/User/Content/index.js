import React from 'react';
import { Route, Redirect } from "react-router-dom";
import styles from './styles.module.css';

export default (params) => {
  let user = params.user;

  return(
    <section className={styles.content}>
      <Route exact path={ `/${user}` }>
        <Redirect to={`/profile/${user}`} />
      </Route>

      {params.routes.map((route)=>(
        <Route exact path={ `/${Object.keys(route)[0]}/${user}` } key={Object.keys(route)[0]}>
          {route[Object.keys(route)[0]]}
        </Route>
        )
      )}

      <Route>
        <h1>Page not found</h1>
      </Route>
    </section>
  )
};