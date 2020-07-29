import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_ROLLS_QL } from './../../../../queries/queries'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faSave } from '@fortawesome/free-solid-svg-icons'

import Moment from 'moment'

import Inpt from './Inpt'
import Spinner from '../../spinner'
import Tasks from './Tasks'
import s_Form from '../../Styles/Form.module.css'

export default function Rolls(params:any) {
  const [isOpen, setIsOpen] = useState([false])
  console.log(params.rolls);
  const rolls:any = params.rolls.rolls.map((item:any)=> item )

  const updateOpenState= (el:any, setEl:any, idx:number) => {
    let tmp = [...el]
    tmp[idx] = !tmp[idx]
    setEl(tmp)
  }

  return (
    <Row className="mb-1">
      <Col sm={12}>
        <Row className="mb-2">
          <Col sm={12}>
            Rolls
          </Col>
        </Row>
      </Col>
      <Col sm={12}>
        {rolls.map((item:any, idx:number)=>{
          const start_date:any = Moment(new Date(parseInt(item.start_date)),'mm-dd-yyyy');
          const end_date:any = Moment(new Date(parseInt(item.end_date)),'mm-dd-yyyy')

          return (
          <div key={idx.toString()} className={`${(isOpen[idx])? s_Form.subList : ''}`}>
            <Row className='mb-1'>
              {isOpen[idx]?(
                <Inpt sm={11} name='Title' type="text" placeholder="Title" onChange={params.handleEvent} value={item.title} />
              ):(
                <Col sm={11}>
                    <span>{item.title} <small>{start_date.format('MM/yyyy')} - {end_date.format('MM/yyyy')}</small></span>
                </Col>
              )}
              <Col sm={1}>
                <span className={s_Form.spanBtn}
                  onClick={() => updateOpenState(isOpen,setIsOpen,idx)}
                  aria-controls="collapse-rolls"
                  aria-expanded={isOpen[idx]}
                >
                  {!isOpen[idx]?<FontAwesomeIcon color='cornflowerblue' icon={faPenSquare} size='1x' />:<FontAwesomeIcon color='cornflowerblue' icon={faSave} size='1x' />}
                </span>
              </Col>
            </Row>
              <Collapse in={isOpen[idx]}>
                <Row className='mb-1' id="collapse-rolls">
                  <Inpt sm={6} name='StartDate' text='Start Date' type="date" onChange={params.handleEvent} value={start_date.format('yyyy-MM-DD')} />
                  <Inpt sm={6} name='EndDate' text='End Date' type="date" onChange={params.handleEvent} value={end_date.format('yyyy-MM-DD')} />
                  <Col sm={12}>
                    <Tasks id={item._id} />
                  </Col>
                </Row>
              </Collapse>
          </div>
        )})}
      </Col>

      <Col sm={12}>
        <Button as={Col} sm={12} size="sm" className={s_Form.btnOutlinePrimary} variant="outline-primary">
          Add Roll
        </Button>
      </Col>
    </Row>
  )
}

