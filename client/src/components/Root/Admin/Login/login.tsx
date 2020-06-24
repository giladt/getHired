import React from 'react';

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import Styles from './login.module.css'
import s_Form from './../../Styles/Form.module.css'

export default (params:any) => {
  return (
      <div className={Styles.body}>
        <Card 
          className={Styles.Card}>
          <Card.Header<any> className={Styles.cardHeader}>Login</Card.Header>
          <Form>
            <Card.Body<any> className={Styles.cardBody}>
              <Form.Group as={Row} controlId="formBasicEmail">
                <Form.Label column>Username<br/>(Your Email address)</Form.Label>
                <Col sm={12}>
                  <Form.Control<any> className={s_Form.Control} type="email" placeholder="Ex. name@service.com" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formBasicPassword">
                <Form.Label column>Password</Form.Label>
                <Col sm={12}>
                  <Form.Control<any> className={s_Form.Control} type="password" placeholder="At least 8 characters" />
                </Col>
              </Form.Group>
              <Button<any> className={s_Form.btnPrimary} variant="primary" type="submit" as={Col}>
                  Submit
              </Button>
            </Card.Body>
          </Form>
        </Card>
      </div>
  );
}