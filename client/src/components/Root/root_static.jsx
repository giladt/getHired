import React from 'react';
import styles from './root_static.module.css';

export default (params) => {
  return(
    <main className={styles.root}>
      <a className={styles.login} href='/login'>Login</a>
    </main>
  )
}
