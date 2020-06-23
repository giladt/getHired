import React from 'react';
import { Map, Marker } from 'google-maps-react';
import MapStyles from './map_styles';

import Address from '../partials/Address/address';
import List from '../partials/List/list';

interface Detail extends Array<Detail> {
  type: string,
  value: number
}

interface Props {
  item: {
    home_address: string,
    contact_details: Detail
  },
  google: any
}

interface State {
  address: any,
  contact_details: Detail
}

class Contact extends React.Component<Props,State>{
  constructor(props:Props){
    super(props);
    this.state = {
      address: props.item.home_address,
      contact_details: props.item.contact_details
    };
  }

  
  render(){
    const map_styles:any = MapStyles;
    const state:State = this.state;
    const props:Props = this.props;

    return(
      <article className="contact">
        <h1>Contact me</h1>
        <p>If you have any questions, please do not hesitate to contact via the below-mentioned contact channels.</p>
        <div className="map-container">
          <Map
            styles = {map_styles}
            google = {props.google}
            initialCenter= {state.address.coordinates}
            zoom={12}
            disableDefaultUI =  {false}
            scrollwheel= {false}
            mapTypeControl= {false}
            scaleControl= {true}
            draggable= {true}
            streetViewControl={false}
            fullscreenControl={false}
          >
            <Marker position={state.address.coordinates} />
          </Map>
        </div>
        <Address _for={state.address} />
        {/* Contact Details */}
        <List details={state.contact_details} />
      </article>
    )
  };
}

export default Contact;