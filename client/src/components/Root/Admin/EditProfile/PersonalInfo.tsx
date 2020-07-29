import React from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'

import Inpt from './Inpt'
import Address from './Address'
import ContactDetails from './ContactDetails'

import s_AdminRoot from '../AdminRoot.module.css'

export default function PersonalInfo(params:any) {

  const state = {get: params.state.get, set: params.state.set}

  return (
    <Card className={s_AdminRoot.Card}>
      <Card.Header className={s_AdminRoot.cardHeader}>
        <strong>Personal Information</strong>
      </Card.Header>

      <Card.Body className={s_AdminRoot.cardBody}>
        <Row className="mb-1">
            <Inpt sm={3} name='first_name' text='First' type="text" placeholder="Your first name" onChange={params.handleEvent} value={params.state.get.first_name} />
            <Inpt sm={3} name='last_name' text='Last' type="text" placeholder="Your last name" onChange={params.handleEvent} value={params.state.get.last_name} />
            <Inpt sm={6} name='title' text='A short Title' type="text" placeholder="What do you do?" onChange={params.handleEvent} value={params.state.get.short_title} />
        </Row>

        <Row className="mb-1">
          <Inpt sm={6} name='birth_date' text='Birth Date' type='date' placeholder='' onChange={params.handleEvent} value={params.state.get.birth_date} />
          <Inpt sm={6} name='place_of_birth' text='Originaly from' type="text" placeholder="Ex. Berlin" onChange={params.handleEvent} value={params.state.get.place_of_birth} />
        </Row>

        <Address address_obj='home_address' noAddAddressButton={true} onChange={params.handleEvent} state={state} />

        <ContactDetails onChange={params.handleEvent} state={state} />
 
      </Card.Body>
    </Card>
  )
}
