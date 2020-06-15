import React from 'react';
import FullName from './full_name';
import styles from './picture.module.css';

export default (params) => {

  let style = {
    backgroundImage: `url(/images/profile/${params.user}.png)`
  };

  return(
      <section className={styles.profilePicture}>
        <div className={styles.img} style={style}></div>
        <div className={styles.blur}></div>
        <div className={styles.text}>
          <h1><FullName first={params.item.first_name} last={params.item.last_name} /></h1>
          <h2>{params.item.short_title}</h2>
        </div>
    </section>
  );
}