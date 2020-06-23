import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobile, faPhone, faPencilAlt, faAt } from '@fortawesome/free-solid-svg-icons';

interface Detail extends Array<Detail>{
  type: string,
  value: number
}

interface Props {
  title?: string,
  details: Detail
}

class List extends React.Component<Props>{
  constructor(props:Props){
    super(props);

    this.state = {
      items: [...props.details],
      visible: false
    };
  }

  render(){
    let details = this.props.details;
    return (
        (details.length > 0) ? (
          <article className = 'list'>
            {this.props.title
            ? <h3>{this.props.title}</h3>
            :''
            }
              {details.map((item,idx) => {
                return(
                <ul key={idx}>
                  <li>
                    <span>{
                      (item.type === 'Mobile')?
                      <FontAwesomeIcon color='cornflowerblue' icon={faMobile} size="2x" />:
                      (item.type === 'Landline')?
                      <FontAwesomeIcon color='cornflowerblue' icon={faPhone} size="2x" />:
                      (item.type === 'E-Mail')?
                      <FontAwesomeIcon color='cornflowerblue' icon={faAt} size="2x" />:
                      <FontAwesomeIcon color='cornflowerblue' icon={faPencilAlt} />
                    }</span>
                  </li>
                  <li key={idx}>
                    <span><strong>{item.value}</strong></span>
                  </li>
                </ul>
                )
              })}
          </article>
        ) : <article></article>
    )
  };
};

export default List;