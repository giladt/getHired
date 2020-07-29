import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_TASKS_QL } from './../../../../queries/queries'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import Inpt from './Inpt';
import Spinner from '../../spinner';

import s_Form from '../../Styles/Form.module.css'

export default function Tasks(params:any) {
  const { loading, error, data } = useQuery(GET_TASKS_QL, {variables: {id: params.id}})  
  if(loading) return (<Spinner />)
  if(error) return <p>`Error! ${error.message}`</p>;
  const tasks:any = data.Tasks.map((item:any)=> item )

  const handleChange = (e:any) => {
    console.log(e.target.value);
  }

  return (
    <Row className="mb-1">
      <Col sm={12}>
        <small>Tasks</small>
      </Col>
      <Col sm={12}>
        {tasks.map((item:any, idx:number)=>(
          <div key={idx.toString()}>
            <Row className={`mb-1`}>
              <Inpt sm={12} name='Task' type='text' placeholder="Description" onChange={handleChange} value={item.description} />
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

