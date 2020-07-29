import React, { useState } from 'react'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faSave } from '@fortawesome/free-solid-svg-icons'

import Rolls from './Rolls'
import Inpt from './Inpt'
import Address from './Address'

import s_AdminRoot from '../AdminRoot.module.css'
import s_Form from './../../Styles/Form.module.css'

export default function Experiences(params:any) {
  const state = {get: params.state.get, set: params.state.set}
  const [isOpen, setIsOpen] = useState([true,true,true])
  const experience:any = state.get.map((item:any)=> item )

  const updateOpenState= (el:any, setEl:any, idx:number) => {
    let tmp = [...el]
    tmp[idx] = !tmp[idx]
    setEl(tmp)
  }

  const handleRollChange:any = (e:any) => {
    params.handleEvent(e);
  }

  return (
    <Card className={s_AdminRoot.Card}>
      <Card.Header className={s_AdminRoot.cardHeader}>
        <strong>Experience</strong>
      </Card.Header>

      <Card.Body className={s_AdminRoot.cardBody}>
        <Col sm={12}>
          {experience.map((item:any, idx:number)=> (
            <div key={idx.toString()} className={`${(isOpen[idx])? s_Form.editMode : ''}`}>
              <Row className="mb-2">
              {isOpen[idx]?(
                <Inpt sm={11} name={`${idx}.employer_name`} text='Employer name' type="text" placeholder="Employer name" onChange={params.handleEvent} value={item.employer_name} />
              ):(
                <Col sm={11}>
                  {item.employer_name}
                </Col>
              )}
                <Col sm={1}>
                  <span className={s_Form.spanBtn}
                    onClick={() => updateOpenState(isOpen,setIsOpen,idx)}
                    aria-controls="collapse-experience"
                    aria-expanded={isOpen[idx]}
                  >
                    {!isOpen[idx]?<FontAwesomeIcon color='cornflowerblue' icon={faPenSquare} size='1x' />:<FontAwesomeIcon color='cornflowerblue' icon={faSave} size='1x' />}
                  </span>
                </Col>
              </Row>
              <Collapse in={isOpen[idx]}>                
                {(item.employer_address && item.employer_address !== null) ? (   
                  <div id="collapse-experience" >
                    <Address title='Address' address_obj={`${idx}.employer_address`} noAddAddressButton={true} onChange={params.handleEvent} state={state} />

                    <Rolls id={item._id} name={`${idx}.rolls`} handleEvent={handleRollChange} rolls={item} />
                  </div>
                ):(
                  <div id="collapse-experience" >
                    <Row className="mb-1">
                      <Col sm={12}>
                        Address
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Col sm={12}>
                        <Button size="sm" className={s_Form.btnOutlinePrimary} variant="outline-primary">
                          Add Address
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
                
              </Collapse>
            </div>
          ))}
          <Button as={Col} size="sm" className={s_Form.btnOutlinePrimary} variant="outline-primary">
            Add experience
          </Button>
        </Col>
      </Card.Body>
    </Card>
  )
}

