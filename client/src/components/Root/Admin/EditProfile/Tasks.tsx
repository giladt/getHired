import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import Inpt from './Inpt';

import s_Form from '../../Styles/Form.module.css'

export default function Tasks(params:any) {
  const tasks:any = params.tasks.tasks.map((item:any)=> item )

  return (
    <Row className="mb-1">
      <Col sm={12}>
        <small>Tasks</small>
      </Col>
      <Col sm={12}>
        {tasks.map((item:any, idx:number)=>(
          <div key={idx.toString()}>
            <Row className={`mb-1`}>
              <Inpt sm={12} name={`${params.name}.${idx}.description`} text='Task' type='text' placeholder="description" onChange={params.handleEvent} value={item.description} />
            </Row>
          </div>
        ))}
      </Col>
      <Col sm={12}>
        <Button as={Col} sm={12} size="sm" className={s_Form.btnOutlinePrimary} variant="outline-primary">
          Add Task
        </Button>
      </Col>
    </Row>
  )
}

