import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faHatWizard } from '@fortawesome/free-solid-svg-icons';

// Components
import WorkExperience from './WorkExperience/experience';
import Education from './Education/education';
import styles from './timeline.module.css';

interface Props {
  item: {
    Education?:any,
    Experience?:any
  }
}

class Timeline extends React.Component<any>{
  render(){
    const props:Props = {
      item:{
        Education: this.props.item.Education || [], 
        Experience: this.props.item.Experience || []
      }
    };

    return(
      <article className={styles.article}>
        <h1>Timeline</h1>
        <div>
          <article className='education'>
            <h2><FontAwesomeIcon icon={faGraduationCap} /> Education</h2>
            <Education education={props.item.Education || ''} />
          </article>
          <article className='experience'>
            <h2><FontAwesomeIcon icon={faHatWizard} /> Experience</h2>
            <WorkExperience experience={props.item.Experience || ''} />
          </article>
          </div>
      </article>
    )
  }
}

export default Timeline;