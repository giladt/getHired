import React, { useState } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import Moment from 'moment'

import Inpt from './Inpt'
import Tasks from './Tasks'
import s_Form from '../../Styles/Form.module.css'

export default function Rolls(params:any) {
  const [isOpen, setIsOpen] = useState([true])
  const rolls:any = params.rolls.rolls.map((item:any)=> item )

  const updateOpenState= (el:any, setEl:any, idx:number) => {
    let tmp = [...el]
    tmp[idx] = !tmp[idx]
    setEl(tmp)
  }

  const handleTaskChange:any = (e:any) => {
    console.log(e.target.name,e.target.value)
    e.preventDefault();
    params.handleEvent(e);
  }

  const El = {
    Title: (params:any) => (
      <Col sm={12}>
        <Row className="mb-2">
          <Col sm={12}>
            {params.children}
          </Col>
        </Row>
      </Col>
    ),

    ButtonAdd: (params:any) => (
      <Col sm={12}>
        <Button as={Col} sm={12} size="sm" className={s_Form.btnOutlinePrimary} variant="outline-primary">
          {params.children}
        </Button>
      </Col>
    ),

    ButtonDelete: (params:any) => (
      <Col sm={1}>
        <span className={`${s_Form.spanBtn} ${s_Form.spanBtnRed}`}
          onClick={(e:any) => {
            e.target.id = 'delete_roll'
            e.target.value = params.args.parent_idx.split('.')[0]
            params.args.event(e,params.args.idx)
          }}
        >
          <FontAwesomeIcon icon={params.args.icon} size='1x' />
        </span>
      </Col>
    ),

    ButtonEdit: (params:any) => (
      <Col sm={1}>
        <span className={s_Form.spanBtn}
          onClick={() => updateOpenState(isOpen,setIsOpen, params.idx)}
          aria-controls="collapse-rolls"
          aria-expanded={isOpen[params.idx]}
        >
          {!isOpen[params.idx]
            ?<FontAwesomeIcon color='cornflowerblue' icon={faPenSquare} size='1x' />
            :<FontAwesomeIcon color='cornflowerblue' icon={faSave} size='1x' />}
        </span>
      </Col>
    ),
  
    RollNameEdit: (params:any) => (
      <>
        <Inpt sm={10} name={`${params.name}.${params.idx}.title`} text='Title' type="text" placeholder="Title" onChange={params.handleEvent} value={params.item.title} />
        <El.ButtonDelete args={{parent_idx: params.name, idx: params.idx, icon: faTrashAlt, event: params.handleEvent}}/>
      </>
    )
  }


  return (
    <Row className="mb-1">
      <El.Title>Rolls</El.Title>
      <Col sm={12}>
        {rolls.map((item:any, idx:number)=>{
          const start_date = Moment(item.start_date,'yyyy-MM-DD').format('MM/yyyy')
          const end_date = Moment(item.end_date,'yyyy-MM-DD').format('MM/yyyy')

          return (
          <div key={idx.toString()} className={`${(isOpen[idx])? s_Form.subList : ''}`}>
            <Row className='mb-1'>
              {isOpen[idx]?(
                <El.RollNameEdit name={params.name} idx={idx} item={item} handleEvent={params.handleEvent} />
              ):(
                <Col sm={11}>
                    <span>{item.title} <small>{start_date} - {end_date}</small></span>
                </Col>
              )}
              <El.ButtonEdit idx={idx} />
            </Row>
              <Collapse in={isOpen[idx]}>
                <Row className='mb-1' id="collapse-rolls">
                  <Inpt sm={6} name={`${params.name}.${idx}.start_date`} text='Start Date' type="date" onChange={params.handleEvent} value={item.start_date} />
                  <Inpt sm={6} name={`${params.name}.${idx}.end_date`} text='End Date' type="date" onChange={params.handleEvent} value={item.end_date} />
                  <Col sm={12}>
                    <Tasks id={item._id} name={`${params.name}.${idx}.tasks`} handleEvent={handleTaskChange} tasks={item} />
                  </Col>
                </Row>
              </Collapse>
          </div>
        )})}
      </Col>
      <El.ButtonAdd>Add Roll</El.ButtonAdd>
    </Row>
  )
}

