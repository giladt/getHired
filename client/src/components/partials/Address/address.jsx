import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

class Address extends React.Component<any>{

  constructor(props:any){
    super(props);

    let {_id, ref_id, street, house_no, city, state, country, postal_code} = props._for;
    this.state = {
      data: {
        _id, ref_id, street, house_no, city, state, country, postal_code
      },
    };
  }

  componentDidMount() {
    let state:any = this.state
    
    this.setState({
      data: {
        ...state.data,
        'ref_id': this.props._for._id
      }
    });
  }

  render(){
    let state:any = this.state
    if(state.data._id){
      return(
        <article className="address">
          <div className='icon'>
          <FontAwesomeIcon color='cornflowerblue' icon={faEnvelope} size='2x' />
          </div>
          <div>
            {state.data.street} {state.data.house_no},&nbsp;
            {state.data.postal_code ? state.data.postal_code : ''}
            {state.data.city && state.data.city.length > 0 
                ? ' ' + state.data.city
                : ''}
            {state.data.city !== state.data.state && state.data.state.length > 0 
              ? ',\n' + state.data.state
              : '\n'}
            {state.data.country && state.data.country.length > 0 
              ? !state.data.state ? ', ':'' + state.data.country 
              : ''}
          </div>
        </article>
      )
    }
  }
}

export default Address;

/* OLD Address with form 
import React from 'react';
import UpdateAddressForm from './update_address_form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

class Address extends React.Component{

  constructor(props){
    super(props);

    let {_id, ref_id, street, house_no, city, state, country, postal_code} = props._for;
    this.state = {
      data: {
        _id, ref_id, street, house_no, city, state, country, postal_code
      },

      visible: false,
      hideButton: props.hideButton || false
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  handleUpdate(value) {
    this.setState({
      data: value
    });
    console.log('updated');
  }

  handleCancelClick(e) {
    e.preventDefault();
    this.toggleEdit();
  }

  toggleEdit(val = null) {
    this.setState({
      visible: val || !state.visible
    });
  }
  
  componentDidMount() {
    this.setState({
      data: {
        ...state.data,
        'ref_id': this.props._for._id
      }
    });
  }

  render(){
    if(state.data._id){
      return(
          
        // Toggle edit mode for address
        !state.visible 
        ? <article className="address">
            <FontAwesomeIcon icon={faMapMarkerAlt} size='lg' />
            <div>{state.data.street} {state.data.house_no},&nbsp;
              {state.data.postal_code ? state.data.postal_code : ''}
              {state.data.city && state.data.city.length > 0 
                  ? ' ' + state.data.city
                  : ''}
              {state.data.city !== state.data.state && state.data.state.length > 0 
                ? ',\n' + state.data.state
                : '\n'}
              {state.data.country && state.data.country.length > 0 
                ? !state.data.state ? ', ':'' + state.data.country 
                : ''}
            </div>
            {!state.hideButton 
            ? <button type="button" text='Edit address' onClick={this.toggleEdit}>
                <FontAwesomeIcon icon={faEdit} size='2x' />
              </button>
            : <div></div>
            }
          </article>
        : <UpdateAddressForm 
            data={state.data}
            handleUpdate={this.handleUpdate}
            onCancel={this.handleCancelClick}
            toggleEdit={this.toggleEdit} 
          />
      )
    }
  }
}
*/