import React from 'react';
import { Route, Redirect } from "react-router-dom";
import styles from './styles.module.css';

export default (params) => {
  let user = params.user || '';
  let employer = params.employer || '';

  return(
    <section className={styles.content}>
      <Route exact path={ `/?u=${user}&e=${employer}` }>
        <Redirect to={`/profile?u=${user}&e=${employer}`} />
      </Route>

      {params.routes.map((route)=>(
        <Route exact path={ `/${Object.keys(route)[0]}` } key={Object.keys(route)[0]}>
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