import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import s_Form from '../../Styles/Form.module.css'
import Inpt from './Inpt';

export default function Address(params:any) {

  const parts = params.address_obj.split('.');
  const address_obj = (parts.length > 1)? params.address_obj : parts[0];
  let data = (Array.isArray(params.state.get)) 
    ? params.state.get[parts[0]][parts[parts.length-1]]
    : params.state.get[address_obj];

  return(
    <>
      <Row className="mb-1">
        <Col sm={12}><br/>{params.title?params.title:'Residence'}</Col>
      </Row>

      <div className="mb-2" >
        <Row className="mb-1">
          <Inpt sm={9} name={`${address_obj}.street`} text= 'Street' type="text" placeholder="Street" onChange={params.onChange} value={data.street} />
          <Inpt sm={3} name={`${address_obj}.house_no`} text= 'No.' type="text" placeholder="House number" onChange={params.onChange} value={data.house_no} />
        </Row>
        <Row className="mb-1">
          <Inpt sm={6} name={`${address_obj}.city`} text= 'City' type="text" placeholder="City" onChange={params.onChange} value={data.city} />
          <Inpt sm={6} name={`${address_obj}.state`} text= 'District/State' type="text" placeholder="District/State" onChange={params.onChange} value={data.state} />
        </Row>
        <Row className="mb-1">
          <Inpt sm={8} name={`${address_obj}.country`} text= 'Country' type="text" placeholder="Country" onChange={params.onChange} value={data.country} />
          <Inpt sm={4} name={`${address_obj}.postal_code`} text= 'Postal Code' type="number" placeholder="Postal Code" onChange={params.onChange} value={data.postal_code} />
        </Row>
      </div>

      {(!params.noAddAddressButton) && (
        <Row className="mb-2">
          <Col sm={12}>
            <Button as={Col} sm={12} size='sm' className={s_Form.btnOutlinePrimary} variant="outline-primary">Add Address</Button>
          </Col>
        </Row>
      )}
    </>
  )
}
