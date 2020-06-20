import React from 'react';
import {
  withRouter,
  useLocation,
  Route
} from "react-router-dom";

// Components
import Content from './Root/root_app.jsx';
import RootPage from './Root/root_static.jsx';
import styles from './main.module.css';

let Main = (params) => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  return(
    <div className={styles.main}>
      <Route exact path={`/`} component={RootPage} />

      <Route path={`/:page`}>
        <Content google={params.google} user={query.get('u')} employer={query.get('e')} />
      </Route>
    </div>
  );
}

export default withRouter(Main);