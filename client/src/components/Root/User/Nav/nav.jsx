import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import styles from './nav.module.css';

interface Params {
  routes: Array<any>,
  icons: Array<any>,
  page: Array<any>,
  user: string,
  employer: string
}

export default (params: Params) => {
  return(
    <nav className={styles.nav}>
      <ul>
        {params.routes.map(route =>{
          const key:any = Object.keys(route)[0];

          return (
          <Link to={ `/${key}?u=${params.user}&e=${params.employer || ''}`} id={key} key={key} >
            <li className={styles[params.page[key]]}>
              <i title={key.charAt(0).toUpperCase()+ key.slice(1)}><FontAwesomeIcon icon={params.icons[key]} /></i>
            </li>
          </Link>
        )})}
      </ul>
    </nav>
  )
}
