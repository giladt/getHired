import React from 'react';
import Moment from 'react-moment';
import styles from './styles.module.css';

// Components

class WorkExperience extends React.Component {
  render(){
    let experience = this.props.experience;

    if(experience.length > 0){
      return(
        <div className="experience">
          { experience.map((item, idx) => {
            
            const i_address = (item.employer_address) && item.employer_address;
            const i_a_city = (i_address && i_address.city && i_address.city.length > 0)? i_address.city: '';
            const i_a_country = (i_address && i_address.country && i_address.country.length > 0)? i_address.country: '';

            return (
              <div key={idx}>
                <h3>{ item.employer_name } <small>{i_a_city}{(i_a_city !== '' && i_a_country !== '')?', ':' '}{i_a_country}</small></h3>
                <div className={styles.rolls}>
                { (item.rolls && item.rolls.length > 0)?
                  item.rolls.map((r, idx) => {
                    let startDate = parseInt(r.start_date);
                    let endDate = parseInt(r.end_date);
                    return (
                      <div className={styles.roll} key={idx}>
                        <h4><small><Moment format="MM/YYYY" date={startDate} /> - <Moment format="MM/YYYY" date={endDate} /></small><br/>{r.title}</h4>
                        <ul className={styles.tasks}>
                          {r.tasks.map((task, idx) => {
                            return <li key={idx}>{task.description}</li>})
                          }
                        </ul>
                      </div>
                    )
                  })
                :''}
                </div>
              </div>
            )
          })}
        </div>
      )
    } else {
      return(
        <div className="experience">
          <div>No experience details have been provided.</div>
        </div>
      );
    }
  }
}

export default WorkExperience;