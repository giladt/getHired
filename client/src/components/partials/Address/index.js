import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

class Address extends React.Component{

  constructor(props){
    super(props);

    let {_id, ref_id, street, house_no, city, state, country, postal_code} = props._for;
    this.state = {
      data: {
        _id, ref_id, street, house_no, city, state, country, postal_code
      },
    };
  }

  componentDidMount() {
    this.setState({
      data: {
        ...this.state.data,
        'ref_id': this.props._for._id
      }
    });
  }

  render(){
    if(this.state.data._id){
      return(
        <article className="address">
          <div className='icon'>
          <FontAwesomeIcon color='cornflowerblue' icon={faEnvelope} size='2x' />
          </div>
          <div>
            {this.state.data.street} {this.state.data.house_no},&nbsp;
            {this.state.data.postal_code ? this.state.data.postal_code : ''}
            {this.state.data.city && this.state.data.city.length > 0 
                ? ' ' + this.state.data.city
                : ''}
            {this.state.data.city !== this.state.data.state && this.state.data.state.length > 0 
              ? ',\n' + this.state.data.state
              : '\n'}
            {this.state.data.country && this.state.data.country.length > 0 
              ? !this.state.data.state ? ', ':'' + this.state.data.country 
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
      visible: val || !this.state.visible
    });
  }
  
  componentDidMount() {
    this.setState({
      data: {
        ...this.state.data,
        'ref_id': this.props._for._id
      }
    });
  }

  render(){
    if(this.state.data._id){
      return(
          
        // Toggle edit mode for address
        !this.state.visible 
        ? <article className="address">
            <FontAwesomeIcon icon={faMapMarkerAlt} size='lg' />
            <div>{this.state.data.street} {this.state.data.house_no},&nbsp;
              {this.state.data.postal_code ? this.state.data.postal_code : ''}
              {this.state.data.city && this.state.data.city.length > 0 
                  ? ' ' + this.state.data.city
                  : ''}
              {this.state.data.city !== this.state.data.state && this.state.data.state.length > 0 
                ? ',\n' + this.state.data.state
                : '\n'}
              {this.state.data.country && this.state.data.country.length > 0 
                ? !this.state.data.state ? ', ':'' + this.state.data.country 
                : ''}
            </div>
            {!this.state.hideButton 
            ? <button type="button" text='Edit address' onClick={this.toggleEdit}>
                <FontAwesomeIcon icon={faEdit} size='2x' />
              </button>
            : <div></div>
            }
          </article>
        : <UpdateAddressForm 
            data={this.state.data}
            handleUpdate={this.handleUpdate}
            onCancel={this.handleCancelClick}
            toggleEdit={this.toggleEdit} 
          />
      )
    }
  }
}
*/