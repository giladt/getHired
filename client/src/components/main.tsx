import React from 'react';
import {
  Route,
} from "react-router-dom";

// Components
import Root from './Root/root_app';
import RootPage from './Root/root_static';
import styles from './main.module.css';
import AdminRoot from './Root/Admin/AdminRoot';

let Main = (params:any) => {
    return(
      <div className={styles.main}>
        <Route exact path={`/`} component={RootPage} />
        <Route exact path={`/:page/:user/:employer`} >
          <Root google={params.google} routes={params.routes} />
        </Route>
        <Route path={`/admin`} component={AdminRoot} />
    </div>
  )
}

export default Main;
