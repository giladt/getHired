import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobile, faPhone, faPencilAlt, faAt } from '@fortawesome/free-solid-svg-icons';

class List extends React.Component{
  constructor(props){
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

/* OLD with button

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faWindowClose } from '@fortawesome/free-regular-svg-icons';

class List extends React.Component{
  constructor(props){
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
            <ul>
              {details.map((item,idx) => {
                return(
                  <li key={idx}>
                    {item.type}: <strong>{item.value}</strong>
                  </li>
                )
              })}
            </ul>
            {!this.state.visible
          ? <button type="button" text="Edit scale" onClick={this.toggleEdit}>
              <FontAwesomeIcon icon={faEdit} size='2x' />
            </button>
          : <button type="button" text="Edit scale" onClick={this.toggleEdit}>
              <FontAwesomeIcon icon={faWindowClose} size='2x' />
            </button>
          }
          </article>
        ) : <article></article>
    )
  };
};

export default List;
*/