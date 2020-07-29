import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import s_Form from '../../Styles/Form.module.css'

interface InputFieldParams {
  name: string,
  address_obj?: string,
  text?: string,
  idx?: number,
  r_id?: number,
  type: string,
  placeholder?: string,
  onChange: any,
  value: string,
  sm: number
}

export default function Inpt(params:InputFieldParams) {

  return (
    <InputGroup size='sm' as={Col} sm={params.sm}>
      <InputGroup.Prepend className={s_Form.Prepend}><InputGroup.Text>{params.text || params.name}</InputGroup.Text></InputGroup.Prepend>
      <Form.Control
        id={params.name}
        className={s_Form.Control} 
        type={params.type}
        onChange={params.onChange}
        value={params.value}
        placeholder={params.placeholder} />
    </InputGroup>
  )
}
