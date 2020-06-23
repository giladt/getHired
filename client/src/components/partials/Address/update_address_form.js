import React from 'react';
import { Mutation } from '@apollo/react-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faWindowClose } from '@fortawesome/free-regular-svg-icons';

// queries
import { UPDATE_ADDRESS } from '../../../queries/queries';

class UpdateAddressForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: {...props.data}
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    //e.preventDefault();
    let value = e.target.value;
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: value
      }
    });    
  }

  render(){

    return (
      <Mutation 
        mutation={UPDATE_ADDRESS} key={ this.props.data._id } >
        {update_address => (
          <div>
            <form 
            onSubmit={(e)=>{ 
              e.preventDefault();
              update_address({
                variables: {
                  _id: this.state.data._id,
                  street: this.state.data.street,
                  house_no: this.state.data.house_no,
                  city: this.state.data.city,
                  state: this.state.data.state,
                  country: this.state.data.country,
                  postal_code: parseInt(this.state.data.postal_code)
                }
              })
              .then(res => {
                // update the change back to the cache
                this.props.handleUpdate({...this.state.data});
                // remove save button
                this.props.toggleEdit(false);
                return res;
              })
              .catch(err => console.error('Mutation Error:', err));
            }}>
                <input name="street" alt="Street" type="text" value={ this.state.data.street } onChange={ this.handleChange } />
                <input name="house_no" alt="No." type="text" value={ this.state.data.house_no } onChange={ this.handleChange } />,&nbsp;
                <input name="postal_code" alt="Postal Code" type="number" value={ this.state.data.postal_code } onChange={ this.handleChange } />&nbsp;
                <input name="city" alt="City" type="text" value={ this.state.data.city } onChange={ this.handleChange } /><br/>
                <input name="state" alt="State" type="text" value={ this.state.data.state } onChange={ this.handleChange } />,&nbsp;
                <input name="country" alt="Country" type="text" value={ this.state.data.country } onChange={ this.handleChange } /><br/>
              <button type="submit" >
                <FontAwesomeIcon icon={faSave} size='2x' />
              </button>
              <button type="button" onClick={this.props.onCancel} >
                <FontAwesomeIcon icon={faWindowClose} size='2x' />
              </button>
            </form>
          </div>
        )}
      </Mutation>
    )
  };
};

export default UpdateAddressForm;