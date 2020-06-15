import React from 'react';
import { Map, Marker } from 'google-maps-react';
import MapStyles from '../partials/Styles';

import Address from '../partials/Address';
import List from '../partials/List';

class Contact extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      address: this.props.item.home_address,
      contact_details: this.props.item.contact_details
    };
  }

  render(){
    console.log(this.state);
    return(
      <article className="contact">
        <h1>Contact me</h1>
        <p>If you have any questions, please do not hesitate to contact at the below-mentioned contact channels.</p>
        <div className="map-container">
          <Map
            className="map"
            google = {this.props.google}
            initialCenter= {this.state.address.coordinates}
            styles = {MapStyles}
            zoom={12}
            disableDefaultUI =  {false}
            scrollwheel= {false}
            navigationControl= {false}
            mapTypeControl= {false}
            scaleControl= {true}
            draggable= {true}
            streetViewControl={false}
            fullscreenControl={false}
          >
            <Marker position={this.state.address.coordinates} />
          </Map>
        </div>
        <Address _for={this.state.address} />
        {/* Contact Details */}
        <List details={this.state.contact_details} />
      </article>
    )
  };
}

export default Contact;