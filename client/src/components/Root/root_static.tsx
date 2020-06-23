import React from 'react';

import styles from './root_static.module.css';

export default (params:any) => {
  return(
    <main className={styles.root}>
      <a className={styles.login} href='/admin/login'>Login</a>
    </main>
  )
}
