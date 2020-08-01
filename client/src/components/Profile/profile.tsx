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
      <article>
        <h1>Dear {employer.contact_name},</h1>
        <p>I’ve examined your position opening for <a href={employer.openning_url} rel='noopener noreferrer' target='_blank'>{employer.role_name}</a> and I believe that my set of skills is a good match for this position.</p>
        <p>A bit about myself:</p>
        <div dangerouslySetInnerHTML={{__html: employer.cover_letter}}></div>

        <p>I look forward to hearing back from you.</p>  
        <p>Yours sincerely,<br/> {props.item.first_name} {props.item.last_name}</p> 
      </article>
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