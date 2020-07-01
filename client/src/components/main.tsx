import React from 'react';
import {
  Route,
} from "react-router-dom";

// Components
import Root from './Root/root_app';
import RootPage from './Root/root_static';
import styles from './main.module.css';
import AdminRoot from './Root/Admin/AdminRoot';

import { useQuery } from '@apollo/react-hooks';
import { GET_CANDIDATE_QL } from './../queries/queries';
import Spinner from './Root/spinner';

const Main = (params:any) => {
  const { loading, error, data } = useQuery(GET_CANDIDATE_QL,{variables: {id:'5ebfa08e2793e32a4bdce817'}});
  if(loading) return (<Spinner/>)
  if(error) return <p>`Error! ${error.message}`</p>;

  return(
    <div className={styles.main}>
      <Route exact path={`/`} component={RootPage} />
      <Route exact path={`/:page/:user/:employer`} >
        <Root google={params.google} routes={params.routes} />
      </Route>
      <Route path={`/admin`}>
        <AdminRoot key='admin_root' data={data} />
      </Route>
    </div>
  )
}

export default Main;
