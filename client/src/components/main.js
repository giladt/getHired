import React from 'react';
import {
  withRouter,
  useLocation,
  Route
} from "react-router-dom";

// Components
import Content from './Root/';
import RootPage from './Root/root';

let Main = (params) => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  return(
    <div>
      <Route exact path={`/`} component={RootPage} />

      <Route path={`/:page`}>
        <Content google={params.google} user={query.get('u')} employer={query.get('e')} />
      </Route>
    </div>
  );
}

export default withRouter(Main);
