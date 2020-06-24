import React from 'react'
import {
  Route,
  Switch,
  useRouteMatch
} from "react-router-dom";

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import NavBar from './NavBar/nav_bar';
import AdminLogin from './Login/login';

import Styles from './AdminRoot.module.css'
import s_Form from './../Styles/Form.module.css'

function AdminRoot(params:any) {
  const { path } = useRouteMatch();

  const links = [
    {name: 'Login', url: '/admin/login'},
    {name: 'Signup', url: '/admin/signup'},
  ]

  const institution_types:Array<string> = [
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

  return (
    <div className={Styles.body}>
      <NavBar links={links} />
      <Container fluid="sm" className="justify-content-md-center">
        <Switch>
          <Route exact path={`${path}`}>
            <Form>
              <Card className={Styles.Card}>
                
                <Card.Header<any> className={Styles.cardHeader}>
                  <strong>Who are you?</strong>
                </Card.Header>

                <Card.Body<any> className={Styles.cardBody}>
                  <Col>
                    <Form.Group controlId="formFirstName" as={Row}>
                      <Col sm={12} md={2}><Form.Label>Name</Form.Label></Col>
                      <Col sm={6} md={5}><Form.Control<any> className={s_Form.Control} type="text" placeholder="Your first name" /></Col>
                      <Col sm={6} md={5}><Form.Control<any> className={s_Form.Control} type="text" placeholder="Your last name" /></Col>
                    </Form.Group>
                    <Form.Group controlId="formShortTitle" as={Row}>
                      <Col sm={12} md={2}><Form.Label>A short title</Form.Label></Col>
                      <Col sm={12} md={10}><Form.Control<any> className={s_Form.Control} type="text" placeholder="What do you do?" /></Col>
                    </Form.Group>
                    <Form.Group controlId="formBirthDate" as={Row}>
                      <Col sm={12} md={2}><Form.Label>Birth Date</Form.Label></Col>
                      <Col sm={12} md={4}><Form.Control<any> className={s_Form.Control} type="date" placeholder="" /></Col>
                      <Col sm={12} md={2}><Form.Label>Originaly from</Form.Label></Col>
                      <Col sm={12} md={4}><Form.Control<any> className={s_Form.Control} type="text" placeholder="Ex. Berlin" /></Col>
                    </Form.Group>
                    <Form.Group controlId="formAddress" as={Row}>
                      <Col sm={12} md={12}><Form.Label>Your Address</Form.Label></Col>
                      <Col sm={12} md={8}><Form.Control<any> className={s_Form.Control} type="text" placeholder="Street" /></Col>
                      <Col sm={12} md={4}><Form.Control<any> className={s_Form.Control} type="text" placeholder="House number" /></Col>
                      <Col sm={12} md={6}><Form.Control<any> className={s_Form.Control} type="text" placeholder="City" /></Col>
                      <Col sm={12} md={6}><Form.Control<any> className={s_Form.Control} type="text" placeholder="District/State" /></Col>
                      <Col sm={12} md={8}><Form.Control<any> className={s_Form.Control} type="text" placeholder="Country" /></Col>
                      <Col sm={12} md={4}><Form.Control<any> className={s_Form.Control} type="number" placeholder="Postal Code" /></Col>
                    </Form.Group>
                  </Col>
                </Card.Body>
              </Card>

              <Card className={Styles.Card}>
                <Card.Header<any> className={Styles.cardHeader}>
                  Your education
                </Card.Header>
                
                <Card.Body<any> className={Styles.cardBody}>
                  <Col>
                    <Button<any> size="sm" className={s_Form.btnOutlinePrimary} variant="outline-primary" as={Col}>
                      Add Education
                    </Button>
                    <Form.Group controlId="formInstitutionName" as={Row}>
                      <Col sm={12} md={2}><Form.Label>Where have you studied?</Form.Label></Col>
                      <Col sm={6} md={5}><Form.Control<any> className={s_Form.Control} type="text" placeholder="Institution name" /></Col>

                      <Col sm={6} md={5}>
                        <Form.Control<any> as ="select" className={s_Form.Control} defaultValue="Institution Type">
                          <option disabled key={0}>Institution Type</option>
                          {institution_types.map((institution_type:string, idx:number) => (<option key={idx}>{institution_type}</option>))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group controlId="formStudiesSubject" as={Row}>
                      <Col sm={12} md={2}><Form.Label>What have you studied?</Form.Label></Col>
                      <Col sm={6} md={5}><Form.Control<any> className={s_Form.Control} type="text" placeholder="ex. Computer Science" /></Col>

                      <Col sm={6} md={5}>
                        <Form.Control<any> as ="select" className={s_Form.Control} defaultValue="What degree have you achived">
                          <option disabled key={0}>What degree have you achived</option>
                          {degrees.map((degree:string, idx:number) => (<option key={idx}>{degree}</option>))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group controlId="formStudiePeriod" as={Row}>
                      <Col sm={12} md={2}><Form.Label>First year</Form.Label></Col>
                      <Col sm={12} md={4}><Form.Control<any> className={s_Form.Control} type="date" /></Col>
                      <Col sm={12} md={2}><Form.Label>Graduation year</Form.Label></Col>
                      <Col sm={12} md={4}><Form.Control<any> className={s_Form.Control} type="date" /></Col>
                    </Form.Group>
                    <Form.Group controlId="formInstituteAddress" as={Row}>
                      <Col sm={12} md={12}><Form.Label>Institution Address</Form.Label></Col>
                      <Col sm={12} md={6}><Form.Control<any> className={s_Form.Control} type="text" placeholder="City" /></Col>
                      <Col sm={12} md={6}><Form.Control<any> className={s_Form.Control} type="text" placeholder="District/State" /></Col>
                      <Col sm={12} md={8}><Form.Control<any> className={s_Form.Control} type="text" placeholder="Country" /></Col>
                      <Col sm={12} md={4}><Form.Control<any> className={s_Form.Control} type="number" placeholder="Postal Code" /></Col>
                    </Form.Group>
                  </Col>

                </Card.Body>
              </Card>

              <Card className={Styles.Card}>
                <Card.Header<any> className={Styles.cardHeader}>
                  Your experience
                </Card.Header>
                
                <Card.Body<any> className={Styles.cardBody}>
                  <Col>
                    <Button<any> size="sm" className={s_Form.btnOutlinePrimary} variant="outline-primary" as={Col}>
                      Add experience
                    </Button>

                    <Form.Group controlId="formEmployerName" as={Row}>
                      <Col sm={12} md={2}><Form.Label>Employer name?</Form.Label></Col>
                      <Col sm={6} md={5}><Form.Control<any> className={s_Form.Control} type="text" placeholder="Employer name" /></Col>
                    </Form.Group>

                    <Form.Group controlId="formInstituteAddress" as={Row}>
                      <Col sm={12} md={12}><Form.Label>Institution Address</Form.Label></Col>
                      <Col sm={8}><Form.Control<any> className={s_Form.Control} type="text" placeholder="Street" /></Col>
                      <Col sm={4}><Form.Control<any> className={s_Form.Control} type="text" placeholder="House number" /></Col>
                      <Col sm={12} md={6}><Form.Control<any> className={s_Form.Control} type="text" placeholder="City" /></Col>
                      <Col sm={12} md={6}><Form.Control<any> className={s_Form.Control} type="text" placeholder="District/State" /></Col>
                      <Col sm={12} md={8}><Form.Control<any> className={s_Form.Control} type="text" placeholder="Country" /></Col>
                      <Col sm={12} md={4}><Form.Control<any> className={s_Form.Control} type="number" placeholder="Postal Code" /></Col>
                    </Form.Group>

                    <Button<any> size="sm" className={s_Form.btnOutlinePrimary} variant="outline-primary" as={Col}>
                      Add roll
                    </Button>

                    <Form.Group controlId="formRoll" as={Row}>
                      <Col sm={12} md={2}><Form.Label>Roll title?</Form.Label></Col>
                      <Col sm={6} md={10}><Form.Control<any> className={s_Form.Control} type="text" placeholder="Employer name" /></Col>
                    </Form.Group>

                    <Form.Group controlId="formStudiePeriod" as={Row}>
                      <Col sm={12} md={2}><Form.Label>From</Form.Label></Col>
                      <Col sm={12} md={4}><Form.Control<any> className={s_Form.Control} type="date" /></Col>
                      <Col sm={12} md={2}><Form.Label>Until</Form.Label></Col>
                      <Col sm={12} md={4}><Form.Control<any> className={s_Form.Control} type="date" /></Col>
                    </Form.Group>

                    <Form.Group controlId="formRoll" as={Row}>
                      <Col sm={12}><Form.Label>Tasks</Form.Label></Col>
                      <Col sm={11}><Form.Control<any> className={s_Form.Control} size="sm" type="text" placeholder="Task description" /></Col>
                      <Col sm={1}>
                        <Button<any> size="sm" className={s_Form.btnOutlinePrimary} variant="outline-primary" as={Col}>
                          +
                        </Button>
                      </Col>
                    </Form.Group>

                  </Col>

                </Card.Body>
              </Card>

              <Button<any> className={s_Form.btnPrimary} variant="primary" type="submit" block>
                Submit
              </Button>
            </Form>

          </Route>
          <Route exact path={`${path}/login`}>
            <AdminLogin />
          </Route> 
        </Switch>
      </Container>
    </div>
  );
}

export default AdminRoot;