import React from 'react';
import styles from './profile.module.css';

class Profile extends React.Component<any>{

  render(){
    const props:any = this.props;
    let letter = (<div></div>);

    const employer = props.item.Applications.find((item:any)=> { 
      return item._id === props.employer;
    });

    if(employer && employer.cover_letter){
      letter = (
      <div>
        <h1>Dear {employer.contact_name},</h1>
        <p>I've reviewed your <a href={employer.openning_url} rel='noopener noreferrer' target='_blank'>offer</a> for <span>{employer.role_name}</span> and I believe that my set of skills is a good match for the this position.</p>
        <p>A bit about myself:</p>
        <div dangerouslySetInnerHTML={{__html: employer.cover_letter}}></div>
        <p>Best regards,</p>
        <p>{props.item.first_name}</p>
      </div>
      )
    }
  
    return(
      <article className={styles.profile}>
        {letter}
      </article>
    )
  }
}

export default Profile;