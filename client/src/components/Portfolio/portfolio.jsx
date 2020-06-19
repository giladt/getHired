import React from 'react';
import styles from './portfolio.module.css';

export default (params) => {
  let skills = params.item.Skills && params.item.Skills.length > 0 ? params.item.Skills.sort((a,b) => {return b.level - a.level;}): undefined;
  let languages = params.item.Languages && params.item.Languages.length > 0 ? params.item.Languages.sort((a,b) => {return b.level - a.level;}): undefined;
  let projects = params.item.projects && params.item.projects.length >0 ? params.item.projects.sort((a,b) => {return b.level - a.level;}): undefined;

  let scale ={
    skill: [
      'Fundamental Awareness',
      'Novice',
      'Intermediate',
      'Advanced',
      'Expert'
    ],
    language: [
      'Elementary',
      'Limited Working',
      'Professional Working',
      'Full Professional',
      'Native / Bilingual'
    ]
  }


  return(
    <article >
      <h1>Portfolio</h1>
      <div className={styles.col}>
        {skills !== undefined && (
        <div className={styles.skills}>
          <h2>Skills</h2>
          {skills.map(skill => (
            <div className={styles.barBg} key={skill._id} >
              <div 
                className={styles.barFg}
                name={skill.name} 
                level={skill.level} 
                style={{
                  width: "calc(" + skill.level * 20 + "% - 1rem)",
                  opacity: skill.level * 0.2
                }}>
              </div>
              <strong>{skill.name} <small>&gt;&gt; {scale.skill[skill.level - 1]}</small></strong>
            </div>
          ))}
        </div>)}
        {languages && (
        <div className={styles.languages}>
          <h2>Languages</h2>
          {languages.map(language => (
            <div className={styles.barBg} key={language._id} >
            <div 
              className={styles.barFg}
              name={language.name} 
              level={language.level} 
              style={{
                width: "calc(" + language.level * 20 + "% - 1rem)",
                opacity: language.level * 0.2
              }}>
            </div>
            <strong>{language.name} <small>&gt;&gt; {scale.language[language.level - 1]}</small></strong>
          </div>
        ))}
        </div>)}
        {projects && (
        <div className={styles.col}>
          <h2>Interests</h2>
        </div>)}

      </div>
    </article>
  )
}
