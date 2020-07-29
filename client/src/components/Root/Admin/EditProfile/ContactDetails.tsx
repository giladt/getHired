import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

import s_Form from './../../Styles/Form.module.css'

export default function ContactDetails(params:any) {
  
  return(
    <>
      <br/>Contact details
      {params.state.get.contact_details.map((item:any,idx:any)=>{
        return (
        <Row className="mb-2" key={idx.toString()}>
          <InputGroup as={Col} sm={12} size='sm'>
            <InputGroup.Prepend className={s_Form.Prepend}><InputGroup.Text>Type</InputGroup.Text></InputGroup.Prepend>
            <Form.Control id={`contact_details.type.${idx}`} className={s_Form.Control} type="text" placeholder="Type" onChange={params.onChange} value={item.type} />
            <InputGroup.Prepend className={s_Form.Prepend}><InputGroup.Text>Value</InputGroup.Text></InputGroup.Prepend>
            <Form.Control id={`contact_details.value.${idx}`} className={s_Form.Control} type="text" placeholder="Value" onChange={params.onChange} value={item.value} />
            <InputGroup.Append className={s_Form.Prepend}>
              <InputGroup.Radio name='is_default_radio' id={`contact_details.is_default.${idx}`} type='radio' className={s_Form.Control} aria-label="Default?" onChange={params.onChange} checked={item.is_default} />
            </InputGroup.Append>
          </InputGroup>
        </Row>
      )})}
      <Row className="mb-2">
        <Col sm={12}>
          <Button as={Col} sm={12} size='sm' className={s_Form.btnOutlinePrimary} variant="outline-primary">Add contact detail</Button>
        </Col>
      </Row>
    </>
  )
}

