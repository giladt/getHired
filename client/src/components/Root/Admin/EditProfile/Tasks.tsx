import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

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
              <Inpt sm={11} name={`${params.name}.${idx}.description`} text='Task' type='text' placeholder="description" onChange={params.handleEvent} value={item.description} />
              <Col sm={1}>
                <span className={`${s_Form.spanBtn} ${s_Form.spanBtnRed}`}
                  onClick={(e:any) => {
                    e.target.id = 'delete_task'
                    params.handleEvent(e,idx)
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} size='1x' />
                </span>
              </Col>
            </Row>
          </div>
        ))}
      </Col>
      <Col sm={12}>
        <Button 
          as={Col} sm={11} size="sm" 
          variant="outline-primary"
          className={s_Form.btnOutlinePrimary} 
          id='add_task'
          onClick={params.onChange} 
          >
          Add Task
        </Button>
      </Col>
    </Row>
  )
}

