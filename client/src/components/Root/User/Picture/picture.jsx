import React from 'react';
import FullName from './full_name.jsx';
import styles from './picture.module.css';

interface Item {
  first_name: string,
  last_name: string,
  short_title: string
}

interface Props {
  user: string,
  item: Item
}

export default (props: Props) => {

  let style = {
    backgroundImage: `url(/images/profile/${props.user}.png)`
  };

  return(
      <section className={styles.profilePicture}>
        <div className={styles.img} style={style}></div>
        <div className={styles.blur}></div>
        <div className={styles.text}>
          <h1><FullName first={props.item.first_name} last={props.item.last_name} /></h1>
          <h2>{props.item.short_title}</h2>
        </div>
    </section>
  );
}