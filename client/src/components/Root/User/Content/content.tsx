import React from 'react';
import { Route } from "react-router-dom";
import styles from './content.module.css';

interface Params {
  user?: string,
  page?: any,
  routes: Array<any>,
  item?: any,
  employer?: string,
  google?: any,
}


export default (params: Params) => {
  const routes:any = params.routes;
  const page:string = Object.keys(params.page)[0];

  const page_content:React.Component = routes.filter((route:any) => route[page])[0][page];
  if(page_content){
    return(
      <section className={styles.content}>
        {page_content}
      </section>
    )} 

  return (
    <Route>
      <h1>Profile not found</h1>
    </Route>
  );
};
