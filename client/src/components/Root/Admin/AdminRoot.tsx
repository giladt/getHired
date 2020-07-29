import React, { useState } from 'react'
import {
  Route,
  Switch,
  useRouteMatch
} from "react-router-dom"

import Moment from 'moment';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import NavBar from './NavBar/nav_bar';
import AdminLogin from './Login/login';
import PersonalInfo from './EditProfile/PersonalInfo'
import Educations from './EditProfile/Educations'
import Experiences from './EditProfile/Experiences'

import s_AdminRoot from './AdminRoot.module.css'
import s_Form from './../Styles/Form.module.css'

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

  const [valEdu, setValEdu]:any = useState(
    data.Education.map((edu:any) => ({
      institution_name: edu.institution_name,
      studies_subject: edu.studies_subject,
      start_date: Moment(new Date(parseInt(edu.start_date)),'mm-dd-yyyy').format('yyyy-MM-DD'),
      graduation_date: Moment(new Date(parseInt(edu.graduation_date)),'mm-dd-yyyy').format('yyyy-MM-DD'),
      institution_address: {
        street: edu.institution_address.street,
        house_no: edu.institution_address.house_no,
        city: edu.institution_address.city,
        state: edu.institution_address.state,
        country: edu.institution_address.country,
        postal_code: edu.institution_address.postal_code
      }
    }))
  )

  const [valExpr, setValExpr]:any = useState(
    data.Experience.map((expr:any) => ({
      employer_name: expr.employer_name,
      employer_address: (expr.employer_address && expr.employer_address !== null) ? {
        street: expr.employer_address.street,
        house_no: expr.employer_address.house_no,
        city: expr.employer_address.city,
        state: expr.employer_address.state,
        country: expr.employer_address.country,
        postal_code: expr.employer_address.postal_code
      }:{
        street: '',
        house_no: '',
        city: '',
        state: '',
        country: '',
        postal_code: ''
      },
      rolls: expr.rolls.map((roll: any) => ({
        title: roll.title,
        start_date: Moment(new Date(parseInt(roll.start_date)),'mm-dd-yyyy').format('yyyy-MM-DD'),
        end_date: Moment(new Date(parseInt(roll.end_date)),'mm-dd-yyyy').format('yyyy-MM-DD'),
        tasks: roll.tasks.map((task: any) => ({
          description: task.description
        }))
      }))
    }))    
  )
  
  const updateValue:any = (state:any, nodes:Array<string>, val:any) => {
    
    if(nodes.length === 2 && !isNaN(parseInt(nodes[1]))) {
      
      state[nodes[1]][nodes[0]] = val;
      return {...state};

    } else if (nodes.length === 1) {

      state[nodes[0]] = val;
      return {...state}

    }
    updateValue(state[nodes[0]], [...nodes].splice(1,), val);

    return {...state}
  }

  const handlePersonalInfoChange:any = (e:any) => {
    const {id, value, checked} = e.target;
    const nodes = id.split('.');

    let info:any = {...valInfo}
    if(checked) info[nodes[0]].map((item:any) => item.is_default=false );
    
    info = updateValue({...valInfo}, nodes, checked?checked:value);
    setValInfo({...valInfo, ...info});
  }

  const handleEducationChange:any = (e:any) => {
    const {id, value} = e.target;
    const nodes = id.split('.');

    let edu:any = [...valEdu]
    let temp = updateValue({...valEdu[nodes[0]]}, [...nodes].slice(1,), value);
    edu[nodes[0]] = temp
    setValEdu(edu);
  }

  const handleExperienceChange:any = (e:any) => {
    const {id, value} = e.target
    const nodes = id.split('.');

    console.log('handleExprChange',id,value)

    let expr:any = [...valExpr]
    let temp = updateValue({...valExpr[nodes[0]]}, [...nodes].slice(1,), value);

    expr[nodes[0]] = temp
    
    setValExpr(expr);
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
              <PersonalInfo id={data._id} handleEvent={handlePersonalInfoChange} state={{get: valInfo, set: setValInfo}} />

              {/* Education */}
              <Educations id={data._id} handleEvent={handleEducationChange} state={{get: valEdu, set: setValEdu}} />

              {/* Experience */}
              <Experiences id={data._id} handleEvent={handleExperienceChange} state={{get: valExpr, set: setValExpr}} />

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