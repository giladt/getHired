import React from 'react';
import Moment from 'react-moment';

// Components
import styles from './education.module.css';

interface Address {
  street: string,
  house_number: string,
  city: string,
  state: string,
  country: string,
  postal_code: number
}

interface Education {
  _id: string,
  start_date: string,
  graduation_date: string,
  institution_address: Address,
  institution_name: string,
  studies_subject: string,
  degree_achived: string
}

interface Props {
  education: Array<Education>
}

export default (props: Props) => {
  return(
    <div>
    {(props.education && props.education.length > 0)?
      props.education.map(item=>{
        const s_date = parseInt(item.start_date);
        const g_date = parseInt(item.graduation_date);
        const i_address = (item.institution_address) && item.institution_address;
        const i_a_city = (i_address.city && i_address.city.length > 0)? i_address.city: '';
        const i_a_country = (i_address.country && i_address.country.length > 0)? i_address.country: '';

        return(
          <div className={styles.education} key={item._id}>
            <h3>{item.institution_name} <small>{i_a_city}{(i_a_city !== '' && i_a_country !== '')?', ':' '}{i_a_country}</small></h3>
            <h4><small><Moment format="YYYY" date={s_date} /> - <Moment format="YYYY" date={g_date} /></small></h4>
            <h4>{item.studies_subject}</h4>
            <div>{item.degree_achived}</div>
          </div>
        )
      }): <div>No education details have been provided. </div>
    }
    </div>
  )
}