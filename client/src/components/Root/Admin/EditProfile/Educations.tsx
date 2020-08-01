import React, { useState } from 'react'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import Address from './Address'
import Inpt from './Inpt'

import s_AdminRoot from '../AdminRoot.module.css'
import s_Form from './../../Styles/Form.module.css'

export default function Education(params:any) {

  const state = {get: params.state.get, set: params.state.set}
  const educations:any = state.get.map((item:any)=> item )
  const [isOpen, setIsOpen] = useState(Array(educations.length).fill(false))
  const updateOpenState= (el:any, setEl:any, idx:number) => {
    let tmp = [...el]
    tmp[idx] = !tmp[idx]
    setEl(tmp)
  }

  const institutionTypes:Array<string> = [
    "High School",
    "Academic Center",
    "College",
    "University",
    "Other"
  ]

  const degrees:Array<string> = [
    "Associate Degree",
    "Bachelor’s Degree",
    "Master’s Degree",
    "Doctorate Degree"
  ]

  return(
    <Card className={s_AdminRoot.Card}>
      <Card.Header className={s_AdminRoot.cardHeader}>
        <strong>Education</strong>
      </Card.Header>

      <Card.Body className={s_AdminRoot.cardBody}>
        <Col sm={12} >
          {educations.map((item:any,idx:number)=>{
            // keep newly added element open
            if(isOpen[idx] === undefined){
              let tmp= [...isOpen]
              tmp[idx]=true
              setIsOpen(tmp)
            }

            return (
              <div key={idx.toString()} className={`${(isOpen[idx])? s_Form.editMode : ''}`}>
                <Row className="mb-2">
                  {isOpen[idx]?(
                    <>
                      <Inpt sm={10} name={`${idx}.institution_name`} text='Institution' type="text" placeholder="Where have you studied" onChange={params.handleEvent} value={item.institution_name} />
                      <Col sm={1}>
                        <span className={`${s_Form.spanBtn} ${s_Form.spanBtnRed}`}
                          onClick={(e:any) => {
                            e.target.id = 'delete_education'
                            params.handleEvent(e,idx)
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} size='1x' />
                        </span>
                      </Col>
                    </>
                  ):(
                    <Col sm={11}>
                      {item.institution_name || 'Please edit this new education entry -->'}
                    </Col>
                  )}
                  <Col sm={1}>
                    <span className={s_Form.spanBtn}
                      onClick={() => updateOpenState(isOpen,setIsOpen,idx)}
                      aria-controls="collapse-education"
                      aria-expanded={isOpen[idx]}
                    >
                      {!isOpen[idx]?<FontAwesomeIcon color='cornflowerblue' icon={faPenSquare} size='1x' />:<FontAwesomeIcon color='cornflowerblue' icon={faSave} size='1x' />}
                    </span>
                  </Col>
                </Row>
                <Collapse in={isOpen[idx]}>                
                  <div id="collapse-education" >
                    <Row className="mb-1">
                      <InputGroup  id={`${idx}.institution_type`} as={Col} sm={5} size='sm'>
                        <InputGroup.Prepend className={s_Form.Prepend}><InputGroup.Text>Institution Type</InputGroup.Text></InputGroup.Prepend>
                        <Form.Control<any> as ="select" className={s_Form.Control} defaultValue="Institution Type">
                          <option disabled key={0}>Institution Type</option>
                          {institutionTypes.map((institutionType:string, idx:number) => (<option key={idx}>{institutionType}</option>))}
                        </Form.Control>
                      </InputGroup>
                    </Row>

                    <Row className="mb-1">
                      <Inpt sm={6} name={`${idx}.studies_subject`} text='Field' type="text" placeholder="ex. Computer Science" onChange={params.handleEvent} value={item.studies_subject} />

                      <InputGroup id={`${idx}.degree_achived`} as={Col} sm={6} size='sm'>
                        <InputGroup.Prepend className={s_Form.Prepend}><InputGroup.Text>Degree achived</InputGroup.Text></InputGroup.Prepend>
                        <Form.Control<any> as ="select" className={s_Form.Control} defaultValue="What degree have you achived">
                          <option disabled key={0}>What degree have you achived</option>
                          {degrees.map((degree:string, idx:number) => (<option key={idx}>{degree}</option>))}
                        </Form.Control>
                      </InputGroup>
                    </Row>

                    <Row className="mb-1">
                      <Inpt sm={6} name={`${idx}.start_date`} text='First year' type='date' placeholder='' onChange={params.handleEvent} value={item.start_date} />
                      <Inpt sm={6} name={`${idx}.graduation_date`} text='Graduation year' type='date'  placeholder='' onChange={params.handleEvent} value={item.graduation_date} />
                    </Row>

                    {(item.institution_address && item.institution_address !== null) ? (   
                      <div>
                        <Address title='Address' address_obj={`${idx}.institution_address`} noAddAddressButton={true} onChange={params.handleEvent} state={state} />
                      </div>
                    ):(
                      <div>
                        <Row className="mb-1">
                          <Col sm={12}>
                            Address
                          </Col>
                        </Row>
                        <Row className="mb-1">
                          <Col sm={12}>
                            <Button size="sm" 
                              className={s_Form.btnOutlinePrimary} 
                              variant="outline-primary"
                              id='add_institution_address'
                              onClick={params.handleEvent}
                            >
                              Add Address
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </div>
                </Collapse>
              </div>
            )
          })}
          <Row className="mb-3">
            <Button size="sm" as={Col}
              className={s_Form.btnOutlinePrimary} 
              variant="outline-primary"
              id='add_education'
              onClick={params.handleEvent}
            >
              Add Education
            </Button>
          </Row>
        </Col>
      </Card.Body>
    </Card>
  )

}
