import React from 'react';
import styles from './styles.module.css';

class Profile extends React.Component{

  componentDidMount() {
    document.title = `${this.props.item.first_name} ${this.props.item.last_name}`;
  }
  
  render(){
    let letter = (<div></div>);

    let employer = this.props.item.Applications.find(item=> { 
      return item._id === this.props.employer;
    });
    if(employer && employer.cover_letter){
      letter = (
      <div>
        <h1>Dear {employer.contact_name},</h1>
        <p>I've reviewed your <a href={employer.openning_url} rel='noopener noreferrer' target='_blank'>offer</a> for <span>{employer.role_name}</span> and I believe that my set of skills is a good match for the this position.</p>
        <p>A bit about myself:</p>
        <div dangerouslySetInnerHTML={{__html: employer.cover_letter}}></div>
        <p>Best regards,</p>
        <p>{this.props.item.first_name}</p>
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