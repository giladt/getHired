import React, { useState } from 'react'
import {
  Route,
  Switch,
  useRouteMatch
} from "react-router-dom"

import Moment from 'moment';

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import NavBar from './NavBar/nav_bar';
import AdminLogin from './Login/login';
import Spinner from '../../Root/spinner';

import s_AdminRoot from './AdminRoot.module.css'
import s_Form from './../Styles/Form.module.css'

import { GET_EDUCATION_QL, GET_EXPERIENCES_QL, GET_ROLLS_QL, GET_TASKS_QL } from '../../../queries/queries'
import { useQuery } from '@apollo/react-hooks'
import Collapse from 'react-bootstrap/Collapse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faSave } from '@fortawesome/free-solid-svg-icons'

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

const Inpt = (params:InputFieldParams) => {

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

function Tasks(params:any) {
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

function Rolls(params:any) {
  const [isOpen, setIsOpen] = useState([false])

  const { loading, error, data } = useQuery(GET_ROLLS_QL, {variables: {id: params.id}})  
  if(loading) return (<Spinner />)
  if(error) return <p>`Error! ${error.message}`</p>;

  const rolls:any = data.Rolls.map((item:any)=> item )

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

function Experiences(params:any) {
  const [isOpen, setIsOpen] = useState([false])

  const { loading, error, data } = useQuery(GET_EXPERIENCES_QL, {variables: {id: params.id}})  
  if(loading) return (<Spinner />)
  if(error) return <p>`Error! ${error.message}`</p>;

  const experience:any = data.Experiences.map((item:any)=> item )

  const updateOpenState= (el:any, setEl:any, idx:number) => {
    let tmp = [...el]
    tmp[idx] = !tmp[idx]
    setEl(tmp)
  }

  const handleRollChange:any = (e:any) => {
    const {id, value, idx} = e.target
    console.log('handleRollChange',id, value, idx)
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
                <Inpt sm={11} name='Name' text='Employer name' type="text" placeholder="Employer name" onChange={params.handleEvent} value={item.employer_name} />
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
                    <Row className="mb-1">
                      <Col sm={12}>
                        Address
                      </Col>
                    </Row>

                    <Row className="mb-1">
                      <Inpt sm={9} name='Expr.Street' text='Street' type="text" placeholder="Street" onChange={params.handleEvent} value={item.employer_address.street} />
                      <Inpt sm={3} name='Expr.HouseNo' text='House number' type="text" placeholder="House number" onChange={params.handleEvent} value={item.employer_address.house_no} />
                    </Row>
                    <Row className="mb-1">
                      <Inpt sm={6} name='Expr.City' text="City" type="text" placeholder="City" onChange={params.handleEvent} value={item.employer_address.city} />
                      <Inpt sm={6} name='Expr.State' text="District/State" type="text" placeholder="District/State" onChange={params.handleEvent} value={item.employer_address.state} />
                    </Row>
                    <Row className="mb-1">
                      <Inpt sm={8} name='Expr.Country' text='Country' type="text" placeholder="Country" onChange={params.handleEvent} value={item.employer_address.country} />
                      <Inpt sm={4} name='Expr.PostalCode' text='Postal Code' type="number" placeholder="Postal Code"onChange={params.handleEvent} value={item.employer_address.postal_code} />
                    </Row>

                    <Rolls id={item._id} handleEvent={handleRollChange} />
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

function Education(params:any) {
  const [isOpen, setIsOpen] = useState([false])

  const { loading, error, data } = useQuery(GET_EDUCATION_QL, {variables: {id: params.id}})
  if(loading) return (<Spinner />)
  if(error) return <p>`Error! ${error.message}`</p>;

  const educations:any = data.Educations.map((item:any)=> item )

  const updateOpenState= (el:any, setEl:any, idx:number) => {
    let tmp = [...el]
    tmp[idx] = !tmp[idx]
    setEl(tmp)
  }
/*
  const handleEducationChange:any = (e:any) => {
    const {id, value, idx} = e.target
  }
*/
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
          {educations.map((item:any,idx:number)=>(
            <div key={idx.toString()} className={`${(isOpen[idx])? s_Form.editMode : ''}`}>
              <Row className="mb-2">
                {isOpen[idx]?(
                  <Inpt sm={11} name='Name' text='Institution' type="text" placeholder="Where have you studied" onChange={params.handleEvent} value={item.institution_name} />
                ):(
                  <Col sm={11}>
                    {item.institution_name}
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
                    <InputGroup as={Col} sm={5} size='sm'>
                      <InputGroup.Prepend className={s_Form.Prepend}><InputGroup.Text>Institution Type</InputGroup.Text></InputGroup.Prepend>
                      <Form.Control<any> as ="select" className={s_Form.Control} defaultValue="Institution Type">
                        <option disabled key={0}>Institution Type</option>
                        {institutionTypes.map((institutionType:string, idx:number) => (<option key={idx}>{institutionType}</option>))}
                      </Form.Control>
                    </InputGroup>
                  </Row>

                  <Row className="mb-1">
                    <Inpt sm={6} name='Study' text='Field' type="text" placeholder="ex. Computer Science" onChange={params.handleEvent} value={item.studies_subject} />

                    <InputGroup as={Col} sm={6} size='sm'>
                      <InputGroup.Prepend className={s_Form.Prepend}><InputGroup.Text>Degree achived</InputGroup.Text></InputGroup.Prepend>
                      <Form.Control<any> as ="select" className={s_Form.Control} defaultValue="What degree have you achived">
                        <option disabled key={0}>What degree have you achived</option>
                        {degrees.map((degree:string, idx:number) => (<option key={idx}>{degree}</option>))}
                      </Form.Control>
                    </InputGroup>
                  </Row>

                  <Row className="mb-1">
                    <Inpt sm={6} name='StartDate' text='First year' type='date' placeholder='' onChange={params.handleEvent} value={item.start_date} />
                    <Inpt sm={6} name='GraduationDate' text='Graduation year' type='date'  placeholder='' onChange={params.handleEvent} value={item.graduation_date} />
                  </Row>

                  {(item.institution_address && item.institution_address !== null) ? (   
                    <div>
                      <Row className="mb-1">
                        <Col sm={12}>
                          Address
                        </Col>
                      </Row>

                      <Row className="mb-1">
                        <Inpt sm={9} name='Expr.Street' text='Street' type="text" placeholder="Street" onChange={params.handleEvent} value={item.institution_address.street} />
                        <Inpt sm={3} name='Expr.HouseNo' text='House number' type="text" placeholder="House number" onChange={params.handleEvent} value={item.institution_address.house_no} />
                      </Row>
                      <Row className="mb-1">
                        <Inpt sm={6} name='Expr.City' text="City" type="text" placeholder="City" onChange={params.handleEvent} value={item.institution_address.city} />
                        <Inpt sm={6} name='Expr.State' text="District/State" type="text" placeholder="District/State" onChange={params.handleEvent} value={item.institution_address.state} />
                      </Row>
                      <Row className="mb-1">
                        <Inpt sm={8} name='Expr.Country' text='Country' type="text" placeholder="Country" onChange={params.handleEvent} value={item.institution_address.country} />
                        <Inpt sm={4} name='Expr.PostalCode' text='Postal Code' type="number" placeholder="Postal Code"onChange={params.handleEvent} value={item.institution_address.postal_code} />
                      </Row>
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
                          <Button size="sm" className={s_Form.btnOutlinePrimary} variant="outline-primary">
                            Add Address
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  )}
                </div>
              </Collapse>
            </div>
          ))}
          <Row className="mb-3">
            <Button size="sm" className={s_Form.btnOutlinePrimary} variant="outline-primary" as={Col}>
              Add Education
            </Button>
          </Row>
        </Col>
      </Card.Body>
    </Card>
  )

}

// V
function ContactDetails(params:any) {
  
  // const handleEvent = (e:any) => {
  //   const [name,index] = e.target.id.split('.')

  //   const temp = [...params.state.get.contact_details]
  //   temp[index] = {[name]: e.target.type !=='radio'? e.target.value : e.target.checked}

  //   params.state.set({
  //     ...params.state.get, 
  //     contact_details: temp
  //   })
  // }

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

function Address(params:any) {

  const data = params.state.get[params.address_obj];

  return(
    <>
      <Row className="mb-1">
        <Col sm={12}><br/>Residence</Col>
      </Row>

      <div className="mb-2" >
        <Row className="mb-1">
          <Inpt sm={9} name={`${params.address_obj}.street`} text= 'Street' type="text" placeholder="Street" onChange={params.onChange} value={data.street} />
          <Inpt sm={3} name={`${params.address_obj}.house_no`} text= 'No.' type="text" placeholder="House number" onChange={params.onChange} value={data.house_no} />
        </Row>
        <Row className="mb-1">
            <Inpt sm={6} name={`${params.address_obj}.city`} text= 'City' type="text" placeholder="City" onChange={params.onChange} value={data.city} />
            <Inpt sm={6} name={`${params.address_obj}.state`} text= 'District/State' type="text" placeholder="District/State" onChange={params.onChange} value={data.state} />
        </Row>
        <Row className="mb-1">
            <Inpt sm={8} name={`${params.address_obj}.country`} text= 'Country' type="text" placeholder="Country" onChange={params.onChange} value={data.country} />
            <Inpt sm={4} name={`${params.address_obj}.postal_code`} text= 'Postal Code' type="number" placeholder="Postal Code" onChange={params.onChange} value={data.postal_code} />
        </Row>
      </div>

      <Row className="mb-2">
        <Col sm={12}>
          <Button as={Col} sm={12} size='sm' className={s_Form.btnOutlinePrimary} variant="outline-primary">Add Address</Button>
        </Col>
      </Row>
    </>
  )
}

function PersonalInfo(params:any) {

  const state = {get: params.state.get, set: params.state.set}

  return (
    <Card className={s_AdminRoot.Card}>
      <Card.Header className={s_AdminRoot.cardHeader}>
        <strong>Personal Information</strong>
      </Card.Header>

      <Card.Body className={s_AdminRoot.cardBody}>
        <Row className="mb-1">
            <Inpt sm={3} name='first_name' text='First' type="text" placeholder="Your first name" onChange={params.handleEvent} value={params.state.get.first_name} />
            <Inpt sm={3} name='last_name' text='Last' type="text" placeholder="Your last name" onChange={params.handleEvent} value={params.state.get.last_name} />
            <Inpt sm={6} name='title' text='A short Title' type="text" placeholder="What do you do?" onChange={params.handleEvent} value={params.state.get.short_title} />
        </Row>

        <Row className="mb-1">
          <Inpt sm={6} name='birth_date' text='Birth Date' type='date' placeholder='' onChange={params.handleEvent} value={params.state.get.birth_date} />
          <Inpt sm={6} name='place_of_birth' text='Originaly from' type="text" placeholder="Ex. Berlin" onChange={params.handleEvent} value={params.state.get.place_of_birth} />
        </Row>

        <Address address_obj='home_address' onChange={params.handleEvent} state={state} />

        <ContactDetails onChange={params.handleEvent} state={state} />
 
      </Card.Body>
    </Card>
  )
}

function AdminRoot(params:any) {

  const { path } = useRouteMatch();
  
  let data = params.data.Candidate[0];

  const links = [
    {name: 'Login', url: '/admin/login'},
    {name: 'Signup', url: '/admin/signup'},
  ]

  const [valInfo, setValInfo]:any = useState({
    first_name: data.first_name,
    last_name: data.last_name,
    short_title: data.short_title,
    birth_date: Moment(new Date(parseInt(data.birth_date)),'mm-dd-yyyy').format('yyyy-MM-DD'),
    place_of_birth: data.place_of_birth,
    home_address: {
      street: data.home_address.street,
      house_no: data.home_address.house_no,
      city: data.home_address.city,
      state: data.home_address.state,
      country: data.home_address.country,
      postal_code: data.home_address.postal_code
    },
    contact_details: [...data.contact_details]
  })

  const [valEdu, setValEdu]:any = useState({
    Name: data.Education[0].institution_name,
    Study: data.Education[0].studies_subject,
    StartDate: Moment(new Date(parseInt(data.Education[0].start_date)),'mm-dd-yyyy').format('yyyy-MM-DD'),
    GraduationDate: Moment(new Date(parseInt(data.Education[0].graduation_date)),'mm-dd-yyyy').format('yyyy-MM-DD'),
    Addr: {
      Street: data.Education[0].institution_address.street,
      HouseNo: data.Education[0].institution_address.house_no,
      City: data.Education[0].institution_address.city,
      State: data.Education[0].institution_address.state,
      Country: data.Education[0].institution_address.country,
      PostalCode: data.Education[0].institution_address.postal_code
    }
  })

  const [valExpr, setValExpr]:any = useState(
    data.Experience.map((expr:any) => ({
      Name: expr.employer_name,
      Addr: (expr.employer_address && expr.employer_address !== null) ? {
        Street: expr.employer_address.street,
        HouseNo: expr.employer_address.house_no,
        City: expr.employer_address.city,
        State: expr.employer_address.state,
        Country: expr.employer_address.country,
        PostalCode: expr.employer_address.postal_code
      }:{
        Street: '',
        HouseNo: '',
        City: '',
        State: '',
        Country: '',
        PostalCode: ''
      },
      Rolls: expr.rolls.map((roll: any) => ({
        Title: roll.title,
        StartDate: roll.start_date,
        EndDate: roll.end_date,
        Tasks: roll.tasks.map((task: any) => ({
          Description: task.description
        }))
      }))
    }))    
  )
  
  const updateValue:any = (state:any, nodes:Array<string>, val:any) => {
    const next = [...nodes];

    if(next.length === 2 && !isNaN(parseInt(next[1]))) {

      state[next[1]][next[0]] = val;
      return {...state};

    } else if (next.length === 1) {

      state[next[0]] = val;
      return {...state};

    }

    return updateValue(state[next[0]], next.splice(1,), val);
  }

  const handleChange:any = (e:any) => {
    const {id, value, checked} = e.target
    const nodes = id.split('.');

    const info = updateValue({...valInfo}, nodes, checked?checked:value);
    setValInfo({...valInfo, ...info})
  }

  const handleEducationChange:any = (e:any) => {
    const {id, value} = e.target
    const subId = id.split('.')[1];
    if(subId) {
      let edu = {...valEdu}
      edu.Addr[subId] = value
      setValEdu({...valEdu, edu})
    } else {
      setValEdu({...valEdu, [id]: value})
    }
  }

  const handleExperienceChange:any = (e:any) => {
    const {id, value} = e.target
    const subId = id.split('.')[1];
    if(subId) {
      let expr = {...valExpr}

      expr.Addr[subId] = value
      setValExpr({...valExpr, ...expr})
    } else {
      setValExpr({...valExpr, [id]: value})
    }
  }

  const handleSubmit:any = (e:any) => {
    e.preventDefault();
    console.log(valInfo);
    console.log(valExpr);
    console.log(valEdu);
  }
  
  return (
    <div className={s_AdminRoot.body}>
      <NavBar links={links} />
      <Container fluid="sm" className="justify-content-md-center" >
        <Switch>
          <Route exact path={`${path}`}>
            <Form onSubmit = {handleSubmit}>

              {/* Personal Info */}
              <PersonalInfo id={data._id} handleEvent={handleChange} state={{get: valInfo, set: setValInfo}} />

              {/* Education */}
              <Education id={data._id} data={{get: valEdu, set: setValEdu}} handleEvent={handleEducationChange} />

              {/* Experience */}
              <Experiences id={data._id} data={{get: valExpr, set: setValExpr}} handleEvent={handleExperienceChange} />

              <Button<any> className={s_Form.btnPrimary} variant="primary" type="submit" block>
                Submit
              </Button>
            </Form>

          </Route>
          <Route exact path={`${path}/login`}>
            <AdminLogin key='login' />
          </Route> 
        </Switch>
      </Container>
    </div>
  );
}

export default AdminRoot;