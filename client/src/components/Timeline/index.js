import React from 'react';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faHatWizard } from '@fortawesome/free-solid-svg-icons';
import WorkExperience from './WorkExperience';
import Education from './Education';

class Timeline extends React.Component{
  render(){
    return(
      <article className={styles.article}>
        <h1>Timeline</h1>
        <div>
          <article className='education'>
            <h2><FontAwesomeIcon icon={faGraduationCap} /> Education</h2>
            <Education education={this.props.item.Education} />
          </article>
          <article className='experience'>
            <h2><FontAwesomeIcon icon={faHatWizard} /> Experience</h2>
            <WorkExperience experience={this.props.item.Experience} />
          </article>
          </div>
      </article>
    )
  }
}

export default Timeline;